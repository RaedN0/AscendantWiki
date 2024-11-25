package com.raedn.ascendantwiki.repository;

import com.raedn.ascendantwiki.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
