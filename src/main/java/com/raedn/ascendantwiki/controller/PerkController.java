package com.raedn.ascendantwiki.controller;

import java.util.List;

import com.raedn.ascendantwiki.model.Perk;
import com.raedn.ascendantwiki.service.PerkService;
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
@RequestMapping("/api/perks")
public class PerkController {

	private final PerkService perkService;

	@GetMapping
	public List<Perk> getPerks() {
		return perkService.getPerks();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Perk createPerk(@RequestBody Perk perk) {
		return perkService.savePerk(perk);
	}

	@PutMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Perk updatePerk(@RequestBody Perk perk) {
		return perkService.savePerk(perk);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deletePerk(@PathVariable Long id) {
		perkService.deletePerk(id);
	}
}
