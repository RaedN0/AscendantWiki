# Base image for Java
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from Maven build
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
