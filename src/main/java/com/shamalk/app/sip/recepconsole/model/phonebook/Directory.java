package com.shamalk.app.sip.recepconsole.model.phonebook;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the directory database table.
 *
 */
@Entity
@Table(name="directory", schema="ve_messaging")
@NamedQuery(name="Directory.findAll", query="SELECT d FROM Directory d")
public class Directory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String category;

	private String domain;

	private String ext;

	private String name;

	private Integer uid;

	public Directory() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDomain() {
		return this.domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getExt() {
		return this.ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getUid() {
		return this.uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

}
