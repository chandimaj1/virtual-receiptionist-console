package com.shamalk.app.sip.recepconsole.model.core;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer uid;

	@Column(name="allow_multi_login")
	private Integer allowMultiLogin;

	@Column(name="allow_view_call_rec")
	private Integer allowViewCallRec;

	private Integer allowedchat;

	private Integer allowedurl;

	private Integer callforwarding;

	private Integer callrecording;

	private Integer calltwinning;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@Column(name="created_by")
	private Integer createdBy;

	@Column(name="current_page")
	private String currentPage;

	private Integer custID;

	private Integer dealerID;

	private Integer debug;

	private String domain;

	private String email;

	@Column(name="error_log")
	private Integer errorLog;

	private String fname;

	@Column(name="ghost_ext")
	private String ghostExt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_active")
	private Date lastActive;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_login")
	private Date lastLogin;

	private String lname;

	private String mobile;

	private Integer outboundcallerid;

	private String password;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="password_set_date")
	private Date passwordSetDate;

	@Column(name="receptionist_console")
	private Integer receptionistConsole;

	private String salt;

	@Column(name="security_salt")
	private String securitySalt;

	private String sessionID;

	private Integer smartphoneapp;

	private Integer sms;

	private Integer status;

	private Integer su;

	private Integer subscriberID;

	private Integer timeofdayrouting;

	private String title;

	private String username;

	private Integer voicemail;

	private Integer webphone;

}