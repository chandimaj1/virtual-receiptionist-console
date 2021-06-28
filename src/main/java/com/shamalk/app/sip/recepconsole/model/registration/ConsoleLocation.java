package com.shamalk.app.sip.recepconsole.model.registration;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.math.BigInteger;


/**
 * The persistent class for the console_location database table.
 * 
 */
@Entity
@Table(name="console_location", schema="opensips")
public class ConsoleLocation implements Serializable {
	private static final long serialVersionUID = 1L;

	private String attr;

	private String callid;

	private String cflags;

	private String contact;

	@Id
	@Column(name="contact_id")
	private BigInteger contactId;

	private Integer cseq;

	private String domain;

	@Temporal(TemporalType.TIMESTAMP)
	private Date expires;

	@Column(name="ext_number")
	private String extNumber;

	private Integer flags;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_modified")
	private Date lastModified;

	private Integer methods;

	private String path;

	private float q;

	private String received;

	@Column(name="sip_instance")
	private String sipInstance;

	private String socket;

	@Column(name="user_agent")
	private String userAgent;

	private String username;

	public ConsoleLocation() {
	}

	public String getAttr() {
		return this.attr;
	}

	public void setAttr(String attr) {
		this.attr = attr;
	}

	public String getCallid() {
		return this.callid;
	}

	public void setCallid(String callid) {
		this.callid = callid;
	}

	public String getCflags() {
		return this.cflags;
	}

	public void setCflags(String cflags) {
		this.cflags = cflags;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public BigInteger getContactId() {
		return this.contactId;
	}

	public void setContactId(BigInteger contactId) {
		this.contactId = contactId;
	}

	public Integer getCseq() {
		return this.cseq;
	}

	public void setCseq(Integer cseq) {
		this.cseq = cseq;
	}

	public String getDomain() {
		return this.domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public Date getExpires() {
		return this.expires;
	}

	public void setExpires(Date expires) {
		this.expires = expires;
	}

	public String getExtNumber() {
		return this.extNumber;
	}

	public void setExtNumber(String extNumber) {
		this.extNumber = extNumber;
	}

	public Integer getFlags() {
		return this.flags;
	}

	public void setFlags(Integer flags) {
		this.flags = flags;
	}

	public Date getLastModified() {
		return this.lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public Integer getMethods() {
		return this.methods;
	}

	public void setMethods(Integer methods) {
		this.methods = methods;
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public float getQ() {
		return this.q;
	}

	public void setQ(float q) {
		this.q = q;
	}

	public String getReceived() {
		return this.received;
	}

	public void setReceived(String received) {
		this.received = received;
	}

	public String getSipInstance() {
		return this.sipInstance;
	}

	public void setSipInstance(String sipInstance) {
		this.sipInstance = sipInstance;
	}

	public String getSocket() {
		return this.socket;
	}

	public void setSocket(String socket) {
		this.socket = socket;
	}

	public String getUserAgent() {
		return this.userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}