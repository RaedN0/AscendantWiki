package com.raedn.ascendantwiki.repository;

import com.raedn.ascendantwiki.model.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
}
