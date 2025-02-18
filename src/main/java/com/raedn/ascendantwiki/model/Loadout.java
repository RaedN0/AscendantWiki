package com.raedn.ascendantwiki.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "loadouts")
public class Loadout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ability_id")
    private Ability ability;

    @ManyToOne
    @JoinColumn(name = "combat_perk_1_id")
    private Perk combatPerk1;

    @ManyToOne
    @JoinColumn(name = "combat_perk_2_id")
    private Perk combatPerk2;

    @ManyToOne
    @JoinColumn(name = "utility_perk_1_id")
    private Perk utilityPerk1;

    @ManyToOne
    @JoinColumn(name = "utility_perk_2_id")
    private Perk utilityPerk2;
}