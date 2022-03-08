/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

def dockerRegistry = "ghcr.io"
def githubRepo = "icgc-argo/platform-ui"
def commit = "UNKNOWN"
def version = "UNKNOWN"

pipeline {
    agent {
        kubernetes {
            label 'platform-ui-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:16.13.0
    tty: true
  - name: docker
    image: docker:18-git
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
  - name: dind-daemon
    image: docker:18.06-dind
    securityContext:
      privileged: true
      runAsUser: 0
    volumeMounts:
    - name: docker-graph-storage
      mountPath: /var/lib/docker
  securityContext:
    runAsUser: 1000
  volumes:
  - name: docker-graph-storage
    emptyDir: {}
"""
        }
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    commit = sh(returnStdout: true, script: 'git describe --always').trim()
                }
                script {
                    version = sh(returnStdout: true, script: 'cat ./package.json | grep version | cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\'').trim()
                }
            }
        }
        stage('Test') {
            steps {
                container('node') {
                    sh "npm ci"
                    sh "npm run test"
                }
                container('node') {
                    sh "GATEWAY_API_ROOT=https://argo-gateway.dev.argo.cancercollaboratory.org/ npm run test-gql-validation"
                }
            }
        }

        stage('Build container') {
            steps {
                container('docker') {
                    // DNS error if --network is default
                    sh "docker build --network=host -f Dockerfile . -t ${dockerRegistry}/${githubRepo}:${commit}"
                }
            }
        }

        stage('Deploy to argo-dev') {
            when {
                branch "develop"
            }
            steps {
                container('node') {
                    sh "GATEWAY_API_ROOT=https://argo-gateway.dev.argo.cancercollaboratory.org/ npm run test-gql-validation"
                }
                container('docker') {
                    withCredentials([usernamePassword(credentialsId:'argoContainers', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login ${dockerRegistry} -u $USERNAME -p $PASSWORD"
                    }
                    sh "docker tag ${dockerRegistry}/${githubRepo}:${commit} ${dockerRegistry}/${githubRepo}:${version}-${commit}"
                    sh "docker push ${dockerRegistry}/${githubRepo}:${version}-${commit}"
                }
                build(job: "/ARGO/provision/platform-ui", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'dev' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${version}-${commit}" ]
                ])
            }
        }

        stage('Deploy to argo-qa') {
            when {
                branch "fix-release-5"
            }
            steps {
                container('node') {
                    sh "GATEWAY_API_ROOT=https://argo-gateway.qa.argo.cancercollaboratory.org/ npm run test-gql-validation"
                }
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'argoGithub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh "git tag ${version}"
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${githubRepo} --tags"
                    }
                    withCredentials([usernamePassword(credentialsId:'argoContainers', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login ${dockerRegistry} -u $USERNAME -p $PASSWORD"
                    }
                    sh "docker tag ${dockerRegistry}/${githubRepo}:${commit} ${dockerRegistry}/${githubRepo}:${version}"
                    sh "docker tag ${dockerRegistry}/${githubRepo}:${commit} ${dockerRegistry}/${githubRepo}:latest"
                    sh "docker push ${dockerRegistry}/${githubRepo}:${version}"
                    sh "docker push ${dockerRegistry}/${githubRepo}:latest"
                }
                build(job: "/ARGO/provision/platform-ui", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'qa' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${version}" ]
                ])
            }
        }
    }
    post {
        unsuccessful {
            // i used node container since it has curl already
            container("node") {
                script {
                    if (env.BRANCH_NAME == "fix-release-5") {
                    withCredentials([string(credentialsId: 'JenkinsFailuresSlackChannelURL', variable: 'JenkinsFailuresSlackChannelURL')]) { 
                            sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${JenkinsFailuresSlackChannelURL}"
                        }
                    }
                }
            }
        }
        fixed {
            // i used node container since it has curl already
            container("node") {
                script {
                    if (env.BRANCH_NAME == "fix-release-5") {
                    withCredentials([string(credentialsId: 'JenkinsFailuresSlackChannelURL', variable: 'JenkinsFailuresSlackChannelURL')]) { 
                            sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Fixed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${JenkinsFailuresSlackChannelURL}"
                        }
                    }
                }
            }
        }
    }
}
