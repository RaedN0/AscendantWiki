package com.raedn.ascendantwiki.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@GetMapping("/auth-status")
	@ResponseBody
	public String checkAuthStatus(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			return "Authenticated as: " + authentication.getName();
		}
		return "Not authenticated";
	}
}
