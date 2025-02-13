package com.raedn.ascendantwiki;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.raedn.ascendantwiki.config.FrontendConfigurationProperties;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final FrontendConfigurationProperties configurationProperties;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
		response.sendRedirect(configurationProperties.baseUrl());
		response.setStatus(HttpServletResponse.SC_OK);
	}
}
