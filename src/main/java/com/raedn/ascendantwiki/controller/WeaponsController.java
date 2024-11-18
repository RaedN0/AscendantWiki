package com.raedn.ascendantwiki.controller;

import java.util.List;

import com.raedn.ascendantwiki.model.Weapon;
import com.raedn.ascendantwiki.service.WeaponService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WeaponsController {

	private final WeaponService weaponService;

	@GetMapping("/weapon")
	public List<Weapon> getAllWeapons() {
		return weaponService.getAllWeapons();
	}

	@PostMapping("/weapon")
	@PreAuthorize("hasRole('ADMIN')")
	public Weapon saveWeapon(@RequestBody Weapon weapon) {
		return weaponService.saveWeapon(weapon);
	}

	@PutMapping("/weapin")
	@PreAuthorize("hasRole('ADMIN')")
	public Weapon updateWeapon(@RequestBody Weapon weapon) {
		return weaponService.saveWeapon(weapon);
	}

	@DeleteMapping("/weapon")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteWeapon(@RequestBody Weapon weapon) {
		weaponService.deleteWeapon(weapon);
	}
}
