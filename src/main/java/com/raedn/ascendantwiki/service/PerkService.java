package com.raedn.ascendantwiki.service;

import java.util.List;

import com.raedn.ascendantwiki.model.Perk;
import com.raedn.ascendantwiki.repository.PerkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerkService {

	private final PerkRepository perkRepository;

	public List<Perk> getPerks() {
		return perkRepository.findAll();
	}

	public Perk savePerk(Perk perk) {
		return perkRepository.save(perk);
	}

	public void deletePerk(Long id) {
		perkRepository.deleteById(id);
	}
}
