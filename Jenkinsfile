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
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                echo 'Building and pushing Docker images...'
                bat 'docker-compose build'
                bat 'docker-compose push'
            }
        }
    }
}
