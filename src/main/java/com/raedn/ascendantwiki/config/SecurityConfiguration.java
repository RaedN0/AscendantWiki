package com.raedn.ascendantwiki.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {

	@Value("${auth0.audience}")
	private String audience;

	@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
	private String issuer;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(authz -> authz
						.requestMatchers("/api/public/**").permitAll()
						.requestMatchers("/api/private/**").authenticated()
						.requestMatchers(HttpMethod.GET, "/api/**").permitAll()  // Allow public read access
						.requestMatchers(HttpMethod.POST, "/api/**").authenticated()  // Require auth for create
						.requestMatchers(HttpMethod.PUT, "/api/**").authenticated()   // Require auth for update
						.requestMatchers(HttpMethod.DELETE, "/api/**").authenticated() // Require auth for delete
						.anyRequest().permitAll()
				)
				.oauth2ResourceServer(oauth2 -> oauth2
						.jwt(Customizer.withDefaults())
				)
				.cors(Customizer.withDefaults());

		return http.build();
	}

	@Bean
	public JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withJwkSetUri(issuer + ".well-known/jwks.json").build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(List.of("*"));
		configuration.setAllowedMethods(List.of("*"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}