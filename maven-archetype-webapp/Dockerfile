FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/maven-archetype-webapp.war app.war

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]
