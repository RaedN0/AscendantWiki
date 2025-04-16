package com.raedn.ascendantwiki.repository;

import java.util.List;

import com.raedn.ascendantwiki.model.Attachment;
import com.raedn.ascendantwiki.model.AttachmentTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

	List<Attachment> findAttachmentByType(AttachmentTypes type);
}
