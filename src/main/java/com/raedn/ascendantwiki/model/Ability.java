package com.raedn.ascendantwiki.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "abilities")
public class Ability {

	@Id
	@GeneratedValue
	private long id;
	private String name;
	private String description;
	private int cooldown;
	private int activationTime;
	@Column(name = "image", columnDefinition = "BLOB")
	private byte[] image;
}
