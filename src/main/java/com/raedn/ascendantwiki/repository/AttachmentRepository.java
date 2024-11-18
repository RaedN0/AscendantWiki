package com.raedn.ascendantwiki.repository;

import com.raedn.ascendantwiki.model.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
