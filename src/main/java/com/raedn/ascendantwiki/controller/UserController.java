package com.raedn.ascendantwiki.controller;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;

@RestController
@RequestMapping("/api")
public class UserController {

	@GetMapping("/auth-status")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> checkAuthStatus(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			Map<String, Object> response = Map.of(
					"username", authentication.getName(),
					"roles", authentication.getAuthorities().stream()
							.map(GrantedAuthority::getAuthority)
							.collect(Collectors.toList())
			);
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(401).body(Map.of("message", "Not authenticated"));
	}
}
