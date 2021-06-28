package com.shamalk.app.sip.recepconsole.model.callhistory;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;

import java.util.Date;


/**
 * The persistent class for the calls database table.
 *
 */
@Entity
@Data
@Table(name="calls", schema="ve_stats")
@NamedQuery(name="Call.findAll", query="SELECT c FROM Call c")
public class Call implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="answered_dest")
	private String answeredDest;

	private String application;

	@Column(name="call_id")
	private String callId;

	@Column(name="called_station_id")
	private String calledStationId;

	@Column(name="calling_station_id")
	private String callingStationId;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	private String destination;

	private String domain;

	private Integer duration;

	private String huntgroup;

	private Integer inbound;

	private String status;
}
