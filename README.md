# AWS Community Day - ANZ
<a href="https://drive.google.com/file/d/1Oei5036ovoVxE-byBcBLu9rZLcd9BSgT/view?usp=sharing">Link to the talk</a>
---

Here's a quick walkthrough of all the required resources, links and explanations associated with the sample project/code which is being dealth with in the talk

---
## About the project/code:
Here is the explanation of the siginificance of the files in the project:

- **app.js** - Consists of the main code associated with the app. The base route `GET /` is defined and coded there
- **tests.js** - Consists of the unit tests associated with the app. This file is executed when tests are performed.
- **deployment.yaml** - The main recipe/yaml file behind the kubernetes deployment. This is the file which is actually executed on the EKS Cluster (Master node) so as to setup the deployment.
- **cleanup.sh** - This is the shell script which is executed for the sake of performing Stage 2 in CICD pipeline i.e. the cleanup stage.
- **deploy.sh** - This is the shell script used by provisioning server in stage 7 to get what it needs for ordering a deployment to the Amazon EKS Cluster in Stage 7.
- **Dockerfile** - The Dockerfile for building the docker image for the main application
- **Dockerfile.dev** - The Dockerfile for building the docker image for performing testing.

---
## Pipeline script:
```groovy
node {
    stage("Cloning the repository") {
        git credentialsId: 'aws-community-day-key', url: 'git@github.com:yashvardhan-kukreja/aws-community-day-talk.git'
    }
    stage ("Performing cleanup") {
        sh label: 'Cleaning up the existing containers, images and code', script: 'bash cleanup.sh'
    }
    stage("Building the test dockerfile") {
        sh label: 'Building the Dockerfile.dev file', script: "docker build -t yashvardhankukreja/aws-community-day:test -f Dockerfile.dev ."
    }
    stage("Running the tests") {
        sh label: 'Running the Dockerfile.dev for testing', script: "docker run -t yashvardhankukreja/aws-community-day:test"
    }
    stage("Building the main docker image") {
        sh label: 'Building the docker image where tag is the build number', script: "docker build -t yashvardhankukreja/aws-community-day:${BUILD_NUMBER} -f Dockerfile ."
        sh label: 'Building the docker image where tag is latest', script: "docker build -t yashvardhankukreja/aws-community-day:latest -f Dockerfile ."
    }
    stage("Pushing the built image to docker hub") {
        withCredentials([string(credentialsId: 'docker-hub-pwd', variable: 'dockerHubPwd')]) {
            sh label: 'Logging in to docker hub', script: "docker login -u yashvardhankukreja -p ${dockerHubPwd}"
            sh label: 'Pushing the latest docker image to docker hub where tag is the build number', script: "docker push yashvardhankukreja/aws-community-day:${BUILD_NUMBER}"
            sh label: 'Pushing the latest docker image to docker hub where tag is latest', script: "docker push yashvardhankukreja/aws-community-day:latest"
        }
    }
    stage("Deployment on the Provisiong Server") {
        sshagent(['provisioning-server-key']) {
            sh "ssh -o StrictHostKeyChecking=no ubuntu@3.80.154.125 < deploy.sh"
            sh "ssh -o StrictHostKeyChecking=no ubuntu@3.80.154.125 kubectl set image deployment/aws-community-day-deployment aws-community-day-container=yashvardhankukreja/aws-community-day:${BUILD_NUMBER}"
        }
    }
}
```

--- 
## Some useful links for you:

- **How to setup an Amazon EKS Cluster** - https://logz.io/blog/amazon-eks-cluster/
- **Understanding Container Orchestration** - https://medium.com/@yash.kukreja.98/day-28-cs-fundamentals-december-container-orchestration-b983770f9ec7
- **Explanation of CICD** - https://www.youtube.com/watch?v=HjXTSbXG1k8
- **For understanding how to deal with Jenkins and write pipeline script** - https://www.youtube.com/watch?v=gdbA3vR2eDs

---


