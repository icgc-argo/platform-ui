def dockerHubRepo = "icgcargo/platform-ui"
def githubRepo = "icgc-argo/platform-ui"
def commit = "UNKNOWN"
def version = "UNKNOWN"
def uikitVersion = "UNKNOWN"

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
    image: node:12.6.0
    tty: true
  - name: docker
    image: docker:18-git
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
      type: File
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
                script {
                    uikitVersion = sh(returnStdout: true, script: 'cat ./uikit/package.release.json | grep version | cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\'').trim()
                }
            }
        }
        stage('Test') {
            steps {
                container('node') {
                    sh "npm ci"
                    sh "npm run type-check"
                    sh "npm run build"
                    sh "npm run test"
                    sh "npm run build-uikit"
                }
                container('node') {
                    sh "GATEWAY_API_ROOT=https://argo-gateway.dev.argo.cancercollaboratory.org/ npm run test-gql-validation"
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
                    withCredentials([usernamePassword(credentialsId:'argoDockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                    }
                    // DNS error if --network is default
                    sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:${version}-${commit}"
                    sh "docker push ${dockerHubRepo}:${version}-${commit}"
                }
                build(job: "/ARGO/provision/platform-ui", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'dev' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${version}-${commit}" ]
                ])
            }
        }
        
        stage('Publish uikit') {
            when {
                branch "master"
            }
            steps {
                container('node') {
                    withCredentials([
                        usernamePassword(credentialsId: 'devops-npm', passwordVariable: 'NPM_PASSWORD', usernameVariable: 'NPM_USERNAME'),
                        usernamePassword(credentialsId: 'devopsargo_email', passwordVariable: 'EMAIL_PASSWORD', usernameVariable: 'EMAIL'),
                    ]) {
                        sh "NPM_EMAIL=${EMAIL} NPM_USERNAME=${NPM_USERNAME} NPM_PASSWORD=${NPM_PASSWORD} npx npm-ci-login"
                    }
                    script {
                        // we still want to run the platform deploy even if this fails, hence try-catch
                        try {
                            sh "npm run publish-uikit"
                            withCredentials([usernamePassword(credentialsId: 'argoGithub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                                sh "git tag uikit-${uikitVersion}"
                                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${githubRepo} --tags"
                            }
                        } catch (err) {
                            echo "could not publish @icgc-argo/uikit version ${uikitVersion}"
                        }
                    }
                }
            }
        }

        stage('Deploy to argo-qa') {
            when {
                branch "hf/1.8.19-3"
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
                    withCredentials([usernamePassword(credentialsId:'argoDockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                    }
                    sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:latest -t ${dockerHubRepo}:${version}"
                    sh "docker push ${dockerHubRepo}:${version}"
                    sh "docker push ${dockerHubRepo}:latest"
                }
                // build(job: "/ARGO/provision/platform-ui", parameters: [
                //      [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'qa' ],
                //      [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${version}" ]
                // ])
            }
        }
    }
    post {
        unsuccessful {
            // i used node container since it has curl already
            container("node") {
                script {
                    if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop") {
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
                    if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop") {
                    withCredentials([string(credentialsId: 'JenkinsFailuresSlackChannelURL', variable: 'JenkinsFailuresSlackChannelURL')]) { 
                            sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Fixed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${JenkinsFailuresSlackChannelURL}"
                        }
                    }
                }
            }
        }
    }
}
