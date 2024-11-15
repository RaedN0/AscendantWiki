package com.raedn.ascendantwiki.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeaponsController {

	@GetMapping("/weapons")
	public String weapons() {
		System.out.println("weapons");
		return "Weapons";
	}
}
