pipeline {
    agent any
    environment {
            DB_URL = credentials('DB_URL')  // Inject DB_URL from Jenkins credentials
            DB_USER = credentials('DB_USER') // Inject username from DB_USER
            DB_PASSWORD = credentials('DB_USER') // Password is automatically part of DB_USER
        }
    stages {
        stage("Build Frontend Docker Image") {
            steps {
                script {
                    sh 'docker build -t ascendantwikifrontend -f src/main/www/Dockerfile src/main/www'
                }
                echo "Frontend Docker image built successfully"
            }
        }
        stage("Build Backend Docker Image") {
            steps {
                script {
                    sh './mvnw clean package -DskipTests'  // Build backend JAR
                    sh 'docker build -t ascendantwikibackend -f src/main/java/Dockerfile .'
                }
                echo "Backend Docker image built successfully"
            }
        }
        stage("Run Containers") {
            steps {
                script {
                    // Stop and remove existing containers if they exist
                    sh 'docker rm -f frontend || true'
                    sh 'docker rm -f backend || true'

                    // Run the Next.js frontend container
                    sh 'docker run -d -p 3000:3000 --name frontend ascendantwikifrontend'

                    // Run the Spring Boot backend container
                    sh 'docker run -d -p 8181:8080 \
                                                    -e SPRING_DATASOURCE_URL=${DB_URL} \
                                                    -e SPRING_DATASOURCE_USERNAME=${DB_USER_USR} \
                                                    -e SPRING_DATASOURCE_PASSWORD=${DB_USER_PSW} \
                                                    --name backend \
                                                    ascendantwikibackend'
                }
                echo "Frontend and Backend are running in Docker"
            }
        }
    }
    post {
        always {
            echo "Pipeline completed"
        }
        success {
            echo "Deployment successful"
        }
        failure {
            echo "Deployment failed"
        }
    }
}
