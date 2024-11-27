package com.raedn.ascendantwiki.controller;

import java.io.IOException;

import com.raedn.ascendantwiki.model.UnderdogDTO;
import com.raedn.ascendantwiki.service.UnderdogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/underdogs")
public class UnderdogController {

	private final UnderdogService underdogService;

	@GetMapping
	public Page<UnderdogDTO> getUnderdogs(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "score") String sortColumn
	) {
		return underdogService.getUnderdogs(sortColumn, PageRequest.of(page, size));
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public String saveUnderdogs(@RequestParam("file") MultipartFile file) {
		try {
			String jsonContent = new String(file.getBytes());

			underdogService.saveUnderdogs(jsonContent);

			return "File uploaded and data saved successfully!";
		} catch (IOException e) {
			return "Error: " + e.getMessage();
		}
	}
}
