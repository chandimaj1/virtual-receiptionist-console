package com.shamalk.app.sip.recepconsole.model.registration;

import java.io.Serializable;
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
@Table(name="subscriber", schema="opensips")
public class Subscriber implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String accountcode;

	@Column(name="actual_vm_filename")
	private String actualVmFilename;

	@Column(name="allow_find")
	private String allowFind;

	private String billing_Extension_number;

	@Column(name="call_rec")
	private Integer callRec;

	private String callTwinning;

	@Column(name="customer_name")
	private String customerName;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="datetime_created")
	private Date datetimeCreated;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="datetime_modified")
	private Date datetimeModified;

	private String domain;

	@Column(name="email_address")
	private String emailAddress;

	private String external_Extension_name;

	private String external_Extension_number;

	@Column(name="first_name")
	private String firstName;

	private String ha1;

	private String ha1b;

	private String huntgroup;

	@Column(name="last_name")
	private String lastName;

	private String local_Extension_name;

	private String local_Extension_number;

	private String localMedia;

	@Column(name="mac_code")
	private String macCode;

	private String password;

	private String rpid;

	private String timezone;

	private String username;

	private String uuid;

	private String VM_attachfile;

	private String VM_Audio_file;

	private String VM_emailall;

	private String VM_emailfrom;

	private String VM_Enable;

	private String VM_greet_id;

	private String VM_mailbox;

	private String VM_notify;

	private String VM_password;

	private Integer VM_skip_instructions;

	@Column(name="wan_ip")
	private String wanIp;
}