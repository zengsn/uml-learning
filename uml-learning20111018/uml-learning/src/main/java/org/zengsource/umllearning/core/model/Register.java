package org.zengsource.umllearning.core.model;

import java.util.Date;

public class Register {

	private String id;
	private String username_;
	private String password_;
	private String email_;
	private Date createdtime_;
	private Date updatedtime_;
	private int enabled;
	private String username;
	private String password;
	private String nickname_;
	private boolean enabled_;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername_() {
		return username_;
	}

	public void setUsername_(String username_) {
		this.username_ = username_;
	}

	public String getPassword_() {
		return password_;
	}

	public void setPassword_(String password_) {
		this.password_ = password_;
	}

	public String getEmail_() {
		return email_;
	}

	public void setEmail_(String email_) {
		this.email_ = email_;
	}

	public Date getCreatedtime_() {
		return createdtime_;
	}

	public void setCreatedtime_(Date createdtime_) {
		this.createdtime_ = createdtime_;
	}

	public Date getUpdatedtime_() {
		return updatedtime_;
	}

	public void setUpdatedtime_(Date updatedtime_) {
		this.updatedtime_ = updatedtime_;
	}

	public int getEnabled() {
		return enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname_() {
		return nickname_;
	}

	public void setNickname_(String nickname_) {
		this.nickname_ = nickname_;
	}

	public boolean isEnabled_() {
		return enabled_;
	}

	public void setEnabled_(boolean enabled_) {
		this.enabled_ = enabled_;
	}

}
