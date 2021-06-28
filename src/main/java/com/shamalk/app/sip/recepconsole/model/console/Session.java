package com.shamalk.app.sip.recepconsole.model.console;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Session {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name="login_username", nullable=false, unique=true)
	private String loginUsername;
	@Column(name="login_password", nullable=false)
	@JsonIgnoreProperties
	private String loginPassword;
	@Column(nullable=false)
	private String uri;
	private String authUsername;
	private String authPassword;
	private String extensionNumber;
	private String wsServer;
	private boolean isLocked;
	private String password;
	@OneToMany(mappedBy = "session", orphanRemoval=true)
    private List<PresenceEntity> presenceEntities;
	@OneToMany(mappedBy = "session", orphanRemoval=true)
	private List<HuntgroupEntity> huntgroupEntities;
}
