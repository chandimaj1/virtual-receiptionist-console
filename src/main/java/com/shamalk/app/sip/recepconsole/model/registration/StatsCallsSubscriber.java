package com.shamalk.app.sip.recepconsole.model.registration;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the stats_calls_subscriber database table.
 * 
 */
@Entity
@Table(name="stats_calls_subscriber", schema="opensips")
public class StatsCallsSubscriber implements Serializable {
	private static final long serialVersionUID = 1L;

	private String accountcode;

	@Column(name="answered_dest")
	private String answeredDest;

	private String application;

	private String billing_Extension_number;

	@Column(name="call_id")
	private String callId;

	@Id
	@Column(name="call_rec")
	private Integer callRec;

	@Column(name="called_station_id")
	private String calledStationId;

	@Column(name="calling_station_id")
	private String callingStationId;

	@Column(name="customer_name")
	private String customerName;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	private String destination;

	private String domain;

	private Integer duration;

	@Column(name="email_address")
	private String emailAddress;

	private String external_Extension_name;

	private String external_Extension_number;

	@Column(name="first_name")
	private String firstName;

	private String huntgroup;

	private Integer id;

	private Integer inbound;

	@Column(name="last_name")
	private String lastName;

	private String local_Extension_name;

	private String local_Extension_number;

	private String password;

	private String status;

	private String username;

	public StatsCallsSubscriber() {
	}

	public String getAccountcode() {
		return this.accountcode;
	}

	public void setAccountcode(String accountcode) {
		this.accountcode = accountcode;
	}

	public String getAnsweredDest() {
		return this.answeredDest;
	}

	public void setAnsweredDest(String answeredDest) {
		this.answeredDest = answeredDest;
	}

	public String getApplication() {
		return this.application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

	public String getBilling_Extension_number() {
		return this.billing_Extension_number;
	}

	public void setBilling_Extension_number(String billing_Extension_number) {
		this.billing_Extension_number = billing_Extension_number;
	}

	public String getCallId() {
		return this.callId;
	}

	public void setCallId(String callId) {
		this.callId = callId;
	}

	public Integer getCallRec() {
		return this.callRec;
	}

	public void setCallRec(Integer callRec) {
		this.callRec = callRec;
	}

	public String getCalledStationId() {
		return this.calledStationId;
	}

	public void setCalledStationId(String calledStationId) {
		this.calledStationId = calledStationId;
	}

	public String getCallingStationId() {
		return this.callingStationId;
	}

	public void setCallingStationId(String callingStationId) {
		this.callingStationId = callingStationId;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDestination() {
		return this.destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getDomain() {
		return this.domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public Integer getDuration() {
		return this.duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getEmailAddress() {
		return this.emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getExternal_Extension_name() {
		return this.external_Extension_name;
	}

	public void setExternal_Extension_name(String external_Extension_name) {
		this.external_Extension_name = external_Extension_name;
	}

	public String getExternal_Extension_number() {
		return this.external_Extension_number;
	}

	public void setExternal_Extension_number(String external_Extension_number) {
		this.external_Extension_number = external_Extension_number;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getHuntgroup() {
		return this.huntgroup;
	}

	public void setHuntgroup(String huntgroup) {
		this.huntgroup = huntgroup;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getInbound() {
		return this.inbound;
	}

	public void setInbound(Integer inbound) {
		this.inbound = inbound;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLocal_Extension_name() {
		return this.local_Extension_name;
	}

	public void setLocal_Extension_name(String local_Extension_name) {
		this.local_Extension_name = local_Extension_name;
	}

	public String getLocal_Extension_number() {
		return this.local_Extension_number;
	}

	public void setLocal_Extension_number(String local_Extension_number) {
		this.local_Extension_number = local_Extension_number;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}