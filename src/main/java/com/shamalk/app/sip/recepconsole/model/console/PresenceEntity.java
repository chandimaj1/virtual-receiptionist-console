package com.shamalk.app.sip.recepconsole.model.console;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class PresenceEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String userName;
	private String domain;
	private String backgroundColour;

	@ManyToOne
	@JoinColumn(name = "session_id")
	private Session session;

}
