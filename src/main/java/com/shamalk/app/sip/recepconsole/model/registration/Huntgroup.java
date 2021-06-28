package com.shamalk.app.sip.recepconsole.model.registration;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name="huntgroup", schema="opensips")
public class Huntgroup {
	@Id
	private Integer id;

	private String annoucement;

	private String companyID;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@Column(name="Customer_Domain")
	private String customerDomain;

	private String description;

	private String displayname;

	private String extensions;

	private String forwardTo;

	@Column(name="huntgroup_name")
	private String huntgroupName;

	@Column(name="huntgroup_number")
	private String huntgroupNumber;

	@Column(name="ring_order")
	private String ringOrder;

	private String siteNote;

	private Integer timeout;

	private String voicemail;

}
