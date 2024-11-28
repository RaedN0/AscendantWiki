package com.raedn.ascendantwiki.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UnderdogDTO {

	private Long id;
	private String name;
	private int score;
	private int rank;
}
