package com.shamalk.app.sip.recepconsole.model.registration;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the core_user_subscriber database table.
 * 
 */
@Entity
@Data
@Table(name="core_user_subscriber", schema="opensips")
public class CoreUserSubscriber implements Serializable {
	private static final long serialVersionUID = 1L;

	private String accountcode;

	private String billing_Extension_number;

	@Column(name="call_rec")
	private Integer callRec;

	@Column(name="customer_name")
	private String customerName;

	private String domain;

	@Column(name="email_address")
	private String emailAddress;

	private String external_Extension_name;

	private String external_Extension_number;

	@Column(name="first_name")
	private String firstName;

	@Id
	private Integer id;

	@Column(name="last_name")
	private String lastName;

	private String local_Extension_name;

	private String local_Extension_number;

	private String password;

	private String username;
}