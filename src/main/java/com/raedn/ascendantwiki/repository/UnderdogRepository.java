package com.raedn.ascendantwiki.repository;

import java.util.Optional;

import com.raedn.ascendantwiki.model.Underdog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UnderdogRepository extends JpaRepository<Underdog, Long> {

	Optional<Underdog> findByName(String name);


	@Query(value = """
			    WITH RankedUnderdogs AS (
			        SELECT 
			            id, 
			            name, 
			            score, 
			            RANK() OVER (ORDER BY 
			                CASE 
			                    WHEN :sortColumn = 'score' THEN score 
			                    ELSE score 
			                END DESC
			            ) AS rank
			        FROM underdogs
			    )
			    SELECT * FROM RankedUnderdogs
			""",
			countQuery = "SELECT COUNT(*) FROM underdogs",
			nativeQuery = true)
	Page<Object[]> findRankedUnderdogs(String sortColumn, Pageable pageable);
}
