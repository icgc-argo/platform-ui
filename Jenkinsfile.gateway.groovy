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
                    sh "cd ./server && npm ci"
                    sh "cd ./server && npm run test"
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
                    sh "cd ./server && docker build --network=host -f Dockerfile . -t icgcargo/argo-gateway:${commit}"
                    sh "docker push icgcargo/argo-gateway:${commit}"
                }
            }
        }
        stage('Deploy to QA') {
            when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return GIT_BRANCH == 'origin/master' || params.FORCE_FULL_BUILD
                }
            }
            steps {
                container('helm') {
                    withCredentials([file(credentialsId:'4ed1e45c-b552-466b-8f86-729402993e3b', variable: 'KUBECONFIG')]) {
                        sh 'helm init --client-only'
                        sh 'helm ls --kubeconfig $KUBECONFIG'
                        sh 'helm repo add icgcargo https://icgc-argo.github.io/charts/'
                        sh 'helm repo update'
                        sh "helm upgrade argo-gateway icgcargo/argo-gateway --set image.tag=${commit},appConfig.EGO_ROOT_GRPC=ego-qa:50051,appConfig.PROGRAM_SERVICE_ROOT=program-service-qa:50051"
                    }
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
                build(job: "/ARGO/provision/gateway", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'qa' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set image.tag=${commit}" ]
                ])
            }
        }
    }
}
