package com.raedn.ascendantwiki.controller;

import java.util.List;

import com.raedn.ascendantwiki.model.Ability;
import com.raedn.ascendantwiki.service.AbilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/abilities")
public class AbilityController {

	private final AbilityService abilityService;

	@GetMapping
	public List<Ability> getAbilities() {
		return abilityService.getAllAbilities();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Ability saveAbility(@RequestBody Ability ability) {
		return abilityService.saveAbility(ability);
	}

	@PutMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Ability updateAbility(@RequestBody Ability ability) {
		return abilityService.saveAbility(ability);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteAbility(@PathVariable Long id) {
		abilityService.deleteAbility(id);
	}
}
