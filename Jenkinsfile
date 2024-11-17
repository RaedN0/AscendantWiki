pipeline {
    agent any
    stages {
//         stage("Build Frontend Docker Image") {
//             steps {
//                 script {
//                     sh 'docker build -t ascendantwikifrontend -f src/main/www/Dockerfile .'
//                 }
//                 echo "Frontend Docker image built successfully"
//             }
//         }
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
                    sh 'docker rm -f nextjs-container || true'
                    sh 'docker rm -f springboot-container || true'

                    // Run the Next.js frontend container
                    sh 'docker run -d -p 3000:3000 --name nextjs-container ascendantwikifrontend'

                    // Run the Spring Boot backend container
                    sh 'docker run -d -p 8181:8080 --name springboot-container ascendantwikibackend'
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
