package com.raedn.ascendantwiki.repository;

import com.raedn.ascendantwiki.model.Loadout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LoadoutRepository extends JpaRepository<Loadout, Long> {
    @Query("SELECT l FROM Loadout l LEFT JOIN FETCH l.ability LEFT JOIN FETCH l.combatPerk1 LEFT JOIN FETCH l.combatPerk2 LEFT JOIN FETCH l.utilityPerk1 LEFT JOIN FETCH l.utilityPerk2 LEFT JOIN FETCH l.user")
    List<Loadout> findAllWithRelations();

    @Query("SELECT l FROM Loadout l LEFT JOIN FETCH l.ability LEFT JOIN FETCH l.combatPerk1 LEFT JOIN FETCH l.combatPerk2 LEFT JOIN FETCH l.utilityPerk1 LEFT JOIN FETCH l.utilityPerk2 LEFT JOIN FETCH l.user WHERE l.user.username = :username")
    List<Loadout> findByUserUsernameWithRelations(@Param("username") String username);

    List<Loadout> findByUserUsername(String username);
}