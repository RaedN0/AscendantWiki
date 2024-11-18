package com.raedn.ascendantwiki.service;

import java.util.List;

import com.raedn.ascendantwiki.model.Weapon;
import com.raedn.ascendantwiki.repository.WeaponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeaponService {

	private final WeaponRepository weaponRepository;

	public List<Weapon> getAllWeapons() {
		return weaponRepository.findAll();
	}

	public Weapon saveWeapon(Weapon weapon) {
		return weaponRepository.save(weapon);
	}

	public void deleteWeapon(Long id) {
		weaponRepository.deleteById(id);
	}
}
