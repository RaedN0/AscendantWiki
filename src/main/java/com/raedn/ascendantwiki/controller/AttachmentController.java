package com.raedn.ascendantwiki.controller;

import java.util.List;

import com.raedn.ascendantwiki.model.Attachment;
import com.raedn.ascendantwiki.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attachments")
public class AttachmentController {

	private final AttachmentService attachmentService;

	@GetMapping
	public List<Attachment> getAttachments() {
		return attachmentService.getAllAttachments();
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Attachment saveAttachment(@RequestBody Attachment attachment) {
		return attachmentService.saveAttachment(attachment);
	}

	@PutMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Attachment updateAttachment(@RequestBody Attachment attachment) {
		return attachmentService.saveAttachment(attachment);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteAttachment(@PathVariable Long id) {
		attachmentService.deleteAttachment(id);
	}
}
