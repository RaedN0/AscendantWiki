package com.raedn.ascendantwiki.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/abilities")
public class AbilityController {

	private final AbilityService abilityService;

	@GetMapping
	public List<Ability> getAllAbilities() {
		return abilityService.getAllAbilities();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Ability saveAbility(
			@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam("cooldown") int cooldown,
			@RequestParam("activationTime") int activationTime,
			@RequestParam("image") MultipartFile image
	) throws IOException {
		Ability ability = new Ability();
		ability.setName(name);
		ability.setDescription(description);
		ability.setCooldown(cooldown);
		ability.setActivationTime(activationTime);
		ability.setImage(image.getBytes());

		return abilityService.saveAbility(ability);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Ability updateAbility(
			@PathVariable Long id,
			@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam("cooldown") int cooldown,
			@RequestParam("activationTime") int activationTime,
			@RequestParam(value = "image", required = false) MultipartFile image
	) throws IOException {
		Ability ability = abilityService.getAbilityById(id);
		ability.setName(name);
		ability.setDescription(description);
		ability.setCooldown(cooldown);
		ability.setActivationTime(activationTime);

		if(image != null && !image.isEmpty()) {
			ability.setImage(image.getBytes());
		}

		return abilityService.saveAbility(ability);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteAbility(@PathVariable Long id) {
		abilityService.deleteAbility(id);
	}
}
