#
# Stage 1: Build the Next.js frontend (static export)
#
FROM node:18 AS frontend-builder

WORKDIR /app

# 1) Copy package.json + lock from src/main/www
COPY src/main/www/package*.json ./
RUN npm install

# 2) Copy the rest of the front-end code into /app
COPY src/main/www/ ./

# 3) Build the Next.js site
#    Because next.config.js has `output: 'export'`,
#    `npm run build` produces a static export in /app/out
RUN npm run build


#
# Stage 2: Build Spring Boot (Java + Maven)
#
FROM maven:3.9.4-eclipse-temurin-21 AS backend-builder

WORKDIR /app

# Copy your Maven config so we can go offline (cache dependencies)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy all Java source (including resources) into /app
COPY src ./src

# Ensure resources/static is empty
RUN rm -rf src/main/resources/static && mkdir -p src/main/resources/static

# Copy the static Next.js export from the previous stage (/app/out)
# into Spring Boot's static folder.
COPY --from=frontend-builder /app/out/ ./src/main/resources/static/

# Build the Spring Boot JAR (skip tests if desired)
RUN mvn clean package -DskipTests


#
# Stage 3: Create final minimal image with Java 21 JRE
#
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the Spring Boot JAR from the backend build stage
COPY --from=backend-builder /app/target/*.jar app.jar

# Expose Spring Boot's default port
EXPOSE 8080

# Run Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
