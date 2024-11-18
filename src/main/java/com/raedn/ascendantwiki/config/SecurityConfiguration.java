package com.raedn.ascendantwiki.config;

import com.raedn.ascendantwiki.CustomAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, CustomAuthenticationSuccessHandler successHandler) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(
						authorizationManagerRequestMatcherRegistry ->
								authorizationManagerRequestMatcherRegistry
										.requestMatchers("/login").permitAll()
										.requestMatchers("/api/**").permitAll()
										.anyRequest().permitAll()
				)
				.httpBasic(Customizer.withDefaults())
				.httpBasic(Customizer.withDefaults())
				.formLogin(
						formLogin -> formLogin
								.permitAll()
								.successHandler(successHandler)
				)
				.logout(
						logout -> logout
								.logoutUrl("/api/logout")
								.deleteCookies("JSESSIONID")
								.logoutSuccessUrl("/login")
				);
		http.cors(Customizer.withDefaults());

		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource(FrontendConfigurationProperties properties) {
		var configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of(properties.baseUrl()));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
		configuration.setAllowCredentials(true);
		configuration.addAllowedHeader("*");

		var source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

}