package com.raedn.ascendantwiki.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.raedn.ascendantwiki.model.Underdog;
import com.raedn.ascendantwiki.repository.UnderdogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnderdogService {

	private final UnderdogRepository underdogRepository;

	public List<Underdog> getUnderdogs() {
		return underdogRepository.findAll();
	}

	@Transactional
	public void saveUnderdogs(String jsonContent) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();

		List<Underdog> underdogs = objectMapper.readValue(jsonContent, new TypeReference<List<Underdog>>() {});

		for (Underdog underdog : underdogs) {
			Optional<Underdog> existingUnderdog = underdogRepository.findByName(underdog.getName());
			if (existingUnderdog.isPresent()) {
				Underdog existing = existingUnderdog.get();
				existing.setScore(underdog.getScore());
				underdogRepository.save(existing);
			} else {
				underdog.setId(null);
				underdogRepository.save(underdog);
			}
		}
	}

}
