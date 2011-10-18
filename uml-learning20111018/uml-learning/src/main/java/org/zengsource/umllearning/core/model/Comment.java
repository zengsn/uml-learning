/**
 * 
 */
package org.zengsource.umllearning.core.model;

import java.util.Date;

/**
 * @author hzucmj
 * 
 */
public class Comment {

	private String id;
	private String tid;
	private String cname;
	private String ccontent;
	private Date cposttime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public String getCcontent() {
		return ccontent;
	}

	public void setCcontent(String ccontent) {
		this.ccontent = ccontent;
	}

	public Date getCposttime() {
		return cposttime;
	}

	public void setCposttime(Date cposttime) {
		this.cposttime = cposttime;
	}


}
