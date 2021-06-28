package com.shamalk.app.sip.recepconsole.model.registration;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;

import java.util.Date;


/**
 * The persistent class for the call_history_out database table.
 * 
 */
@Entity
@Data
@Table(name="call_history_out")
@NamedQuery(name="CallHistoryOut.findAll", query="SELECT c FROM CallHistoryOut c")
public class CallHistoryOut implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name="called_station_id", length=64)
	private String calledStationId;

	@Column(name="calling_station_id", length=64)
	private String callingStationId;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	@Column(length=255)
	private String domain;

	private int duration;

	@Column(name="External_Extension_Number", length=64)
	private String externalExtensionNumber;

	@Id
	@Column(nullable=false)
	private int id;

	@Column(name="Local_Extension_number", length=64)
	private String localExtensionNumber;
}