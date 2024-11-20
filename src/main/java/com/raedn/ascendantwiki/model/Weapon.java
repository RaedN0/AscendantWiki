package com.raedn.ascendantwiki.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "weapons")
public class Weapon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private double baseDamage;
	private double fireRate;
	private double reloadSpeed;
	@Enumerated(value = EnumType.STRING)
	private WeaponCategory category;
	@Enumerated(value = EnumType.STRING)
	private Rarity rarity;
	@Enumerated(value = EnumType.STRING)
	private Ammo ammo;
	private int cost;
}
