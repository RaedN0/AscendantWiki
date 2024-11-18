package com.raedn.ascendantwiki.controller;

import com.raedn.ascendantwiki.model.Perk;
import com.raedn.ascendantwiki.model.PerkTypes;
import com.raedn.ascendantwiki.service.PerkService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/perks")
public class PerkController {

	private final PerkService perkService;

	@GetMapping
	public List<Perk> getAllPerks() {
		return perkService.getAllPerks();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Perk createPerk(
			@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam("type") String type,
			@RequestParam("image") MultipartFile image) throws IOException {

		Perk perk = new Perk();
		perk.setName(name);
		perk.setDescription(description);
		perk.setType(PerkTypes.valueOf(type.toUpperCase()));
		perk.setImage(image.getBytes());

		return perkService.savePerk(perk);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Perk updatePerk(
			@PathVariable Long id,
			@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam("type") String type,
			@RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

		Perk existingPerk = perkService.getPerkById(id);
		existingPerk.setName(name);
		existingPerk.setDescription(description);
		existingPerk.setType(PerkTypes.valueOf(type.toUpperCase()));

		if (image != null && !image.isEmpty()) {
			existingPerk.setImage(image.getBytes());
		}

		return perkService.savePerk(existingPerk);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deletePerk(@PathVariable Long id) {
		perkService.deletePerk(id);
	}
}
