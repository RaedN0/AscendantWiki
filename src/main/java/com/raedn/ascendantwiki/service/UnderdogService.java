package com.raedn.ascendantwiki.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.raedn.ascendantwiki.model.Underdog;
import com.raedn.ascendantwiki.model.UnderdogDTO;
import com.raedn.ascendantwiki.repository.UnderdogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnderdogService {

	private final UnderdogRepository underdogRepository;

	public Page<UnderdogDTO> getUnderdogs(String sortColumn, Pageable pageable, String searchQuery) {

		Page<Object[]> results;
		if (searchQuery == null || searchQuery.isEmpty()) {
			results = underdogRepository.findRankedUnderdogs(sortColumn, pageable);
		} else {
			results = underdogRepository.findRankedAndFilteredUnderdogs(searchQuery, pageable);
		}

		List<UnderdogDTO> dtos = results.stream()
				.map(row -> new UnderdogDTO(
						((Number) row[0]).longValue(),
						(String) row[1],
						((Number) row[2]).intValue(),
						((Number) row[3]).intValue()
				))
				.collect(Collectors.toList());

		return new PageImpl<>(dtos, pageable, results.getTotalElements());
	}

	@Transactional
	public void saveUnderdogs(String jsonContent) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();

		List<Underdog> underdogs = objectMapper.readValue(jsonContent, new TypeReference<List<Underdog>>() {
		});

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
