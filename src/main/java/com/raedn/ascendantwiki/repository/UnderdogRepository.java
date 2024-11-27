package com.raedn.ascendantwiki.repository;

import java.util.Optional;

import com.raedn.ascendantwiki.model.Underdog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnderdogRepository extends JpaRepository<Underdog, Long> {

	public Optional<Underdog> findByName(String name);
}
