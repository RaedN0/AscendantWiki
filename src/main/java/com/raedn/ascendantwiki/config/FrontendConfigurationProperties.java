package com.raedn.ascendantwiki.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.frontend")
public record FrontendConfigurationProperties(String baseUrl) {
}