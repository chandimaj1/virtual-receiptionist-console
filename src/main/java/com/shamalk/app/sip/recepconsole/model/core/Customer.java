package com.shamalk.app.sip.recepconsole.model.core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="customer", schema="ve_core")
public class Customer {
	@Id
	private Integer id;

	@Column(name="account_manager")
	private String accountManager;

	private String address1;

	private String address2;

	@Column(name="call_recording_max")
	private Integer callRecordingMax;

	@Column(name="company_domain")
	private String companyDomain;

	@Column(name="company_id")
	private String companyId;

	@Column(name="company_name")
	private String companyName;

	@Column(name="conference_max")
	private Integer conferenceMax;

	private String country;

	private String county;

	private String created;

	@Column(name="created_by")
	private String createdBy;

	private Integer dealerID;

	@Column(name="huntgroup_entity_max")
	private Integer huntgroupEntityMax;

	private String lastViewed;

	@Column(name="payment_type")
	private Integer paymentType;

	private String postcode;

	@Column(name="presence_entity_max")
	private Integer presenceEntityMax;

	@Column(name="primary_contact")
	private Integer primaryContact;

	@Column(name="receptionist_console_max")
	private Integer receptionistConsoleMax;

	private Integer siteMessaging;

	@Column(name="smart_phone_app_max")
	private Integer smartPhoneAppMax;

	@Column(name="sms_originator")
	private String smsOriginator;

	private String telephone;

	private Integer tf_custID;

	private String town;
	
	@Column(name="console_password")
	private String consolePassword;
}
