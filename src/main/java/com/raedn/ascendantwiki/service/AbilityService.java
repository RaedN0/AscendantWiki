package com.raedn.ascendantwiki.service;

import java.util.List;

import com.raedn.ascendantwiki.model.Ability;
import com.raedn.ascendantwiki.repository.AbilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AbilityService {

	private final AbilityRepository abilityRepository;

	public List<Ability> getAllAbilities() {
		return abilityRepository.findAll();
	}

	public Ability saveAbility(Ability ability) {
		return abilityRepository.save(ability);
	}

	public void deleteAbility(long id) {
		abilityRepository.deleteById(id);
	}
}
