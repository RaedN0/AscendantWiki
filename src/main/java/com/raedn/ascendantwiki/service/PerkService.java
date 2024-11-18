package com.raedn.ascendantwiki.service;

import com.raedn.ascendantwiki.model.Perk;
import com.raedn.ascendantwiki.repository.PerkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PerkService {

	private final PerkRepository perkRepository;

	public List<Perk> getAllPerks() {
		return perkRepository.findAll();
	}

	public Perk getPerkById(Long id) {
		return perkRepository.findById(id).orElseThrow(() -> new RuntimeException("Perk not found"));
	}

	public Perk savePerk(Perk perk) {
		return perkRepository.save(perk);
	}

	public void deletePerk(Long id) {
		perkRepository.deleteById(id);
	}
}
