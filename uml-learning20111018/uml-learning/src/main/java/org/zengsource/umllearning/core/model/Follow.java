package org.zengsource.umllearning.core.model;

import java.io.Serializable;
import java.util.Date;

public class Follow implements Serializable {
	
	private static final long serialVersionUID = 5275490238442506499L;
	/**
	 * @author swyma
	 */
	private String id;
	private String follow;
	private String follower;
	private Date date;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFollow() {
		return follow;
	}
	public void setFollow(String follow) {
		this.follow = follow;
	}
	public String getFollower() {
		return follower;
	}
	public void setFollower(String follower) {
		this.follower = follower;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
