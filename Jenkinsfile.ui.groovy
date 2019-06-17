def commit = "UNKNOWN"

pipeline {
    agent {
        kubernetes {
            label 'gateway-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: mhart/alpine-node:latest
    tty: true
  - name: helm
    image: alpine/helm:2.12.3
    tty: true
    command:
    - cat
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
        stage('Test') {
            steps {
                container('node') {
                    git url: 'https://github.com/icgc-argo/argo-platform', branch: 'master'
                    sh "cd ./client && npm ci"
                    sh "cd ./client && npm run test"
                }
            }
        }
        stage('Build image') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId:'8d0aaceb-2a19-4f92-ae37-5b61e4c0feb8', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                    }
                    git url: 'https://github.com/icgc-argo/argo-platform', branch: 'master'
                    // DNS error if --network is default
                    script {
                        commit = sh(returnStdout: true, script: 'git describe --always').trim()
                    }
                    sh "cd ./client && docker build --network=host -f Dockerfile . -t icgcargo/platform-ui:${commit}"
                    sh "docker push icgcargo/platform-ui:${commit}"
                }
            }
        }

        stage('Deploy to argo-qa') {
            when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return GIT_BRANCH == 'origin/master' || params.FORCE_FULL_BUILD
                }
            }
            steps {
                build(job: "/ARGO/provision/platform-ui", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'qa' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set image.tag=${commit}" ]
                ])
            }
        }
    }
}
