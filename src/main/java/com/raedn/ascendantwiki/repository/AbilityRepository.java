package com.raedn.ascendantwiki.repository;

import com.raedn.ascendantwiki.model.Ability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbilityRepository extends JpaRepository<Ability, Long> {
}
