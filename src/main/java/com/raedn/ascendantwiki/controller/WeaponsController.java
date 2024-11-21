package com.raedn.ascendantwiki.controller;

import java.io.IOException;
import java.util.List;

import com.raedn.ascendantwiki.model.Ammo;
import com.raedn.ascendantwiki.model.Rarity;
import com.raedn.ascendantwiki.model.Weapon;
import com.raedn.ascendantwiki.model.WeaponCategory;
import com.raedn.ascendantwiki.service.WeaponService;
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
@RequestMapping("/api/weapons")
public class WeaponsController {

	private final WeaponService weaponService;

	@GetMapping
	public List<Weapon> getAllWeapons() {
		return weaponService.getAllWeapons();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Weapon saveWeapon(
			@RequestParam("name") String name,
			@RequestParam("baseDamage") double baseDamage,
			@RequestParam("fireRate") double fireRate,
			@RequestParam("reloadSpeed") double reloadSpeed,
			@RequestParam("category") String category,
			@RequestParam("rarity") String rarity,
			@RequestParam("ammo") String ammo,
			@RequestParam("cost") int cost,
			@RequestParam("image") MultipartFile image
	) throws IOException {
		Weapon weapon = new Weapon();
		weapon.setName(name);
		weapon.setBaseDamage(baseDamage);
		weapon.setFireRate(fireRate);
		weapon.setReloadSpeed(reloadSpeed);
		weapon.setCategory(WeaponCategory.valueOf(category));
		weapon.setRarity(Rarity.valueOf(rarity));
		weapon.setAmmo(Ammo.valueOf(ammo));
		weapon.setCost(cost);
		weapon.setImage(image.getBytes());

		return weaponService.saveWeapon(weapon);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Weapon updateWeapon(
			@PathVariable Long id,
			@RequestParam("name") String name,
			@RequestParam("baseDamage") double baseDamage,
			@RequestParam("fireRate") double fireRate,
			@RequestParam("reloadSpeed") double reloadSpeed,
			@RequestParam("category") String category,
			@RequestParam("rarity") String rarity,
			@RequestParam("ammo") String ammo,
			@RequestParam("cost") int cost,
			@RequestParam(value = "image", required = false) MultipartFile image
	) throws IOException {
		Weapon weapon = weaponService.getWeaponById(id);
		weapon.setName(name);
		weapon.setBaseDamage(baseDamage);
		weapon.setFireRate(fireRate);
		weapon.setReloadSpeed(reloadSpeed);
		weapon.setCategory(WeaponCategory.valueOf(category));
		weapon.setRarity(Rarity.valueOf(rarity));
		weapon.setAmmo(Ammo.valueOf(ammo));
		weapon.setCost(cost);

		if (image != null && !image.isEmpty()) {
			weapon.setImage(image.getBytes());
		}

		return weaponService.saveWeapon(weapon);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteWeapon(@PathVariable Long id) {
		weaponService.deleteWeapon(id);
	}
}
