package com.raedn.ascendantwiki.service;

import java.util.List;

import com.raedn.ascendantwiki.model.Attachment;
import com.raedn.ascendantwiki.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttachmentService {
	private final AttachmentRepository attachmentRepository;

	public List<Attachment> getAllAttachments() {
		return attachmentRepository.findAll();
	}

	public Attachment saveAttachment(Attachment attachment) {
		return attachmentRepository.save(attachment);
	}

	public void deleteAttachment(Long id) {
		attachmentRepository.deleteById(id);
	}
}
