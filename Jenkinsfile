pipeline {
    agent any

    tools {
        jdk 'JDK17'
        maven 'Maven_3_9_11'
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-creds')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Saketh-Ganji/Self-healing-systems.git'
            }
        }

        stage('Build Java Backend') {
            steps {
                dir('maven-archetype-webapp') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Node Backend') {
            steps {
                dir('node-backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install --legacy-peer-deps'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
                        bat 'docker-compose build'
                        bat 'docker-compose push'
                    }
                }
            }
        }
    }
}
