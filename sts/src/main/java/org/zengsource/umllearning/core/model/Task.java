package org.zengsource.umllearning.core.model;

import java.io.Serializable;
import java.util.Date;

public class Task implements Serializable {

	private String t_id;
	private String t_author;
	private String t_type;
	private String t_subject;
	private String t_title;
	private String t_pic;
	private String t_content;
	private Date t_posttime;
	private Date t_finishtime;

	public String getT_id() {
		return t_id;
	}

	public void setT_id(String t_id) {
		this.t_id = t_id;
	}

	public String getT_author() {
		return t_author;
	}

	public void setT_author(String t_author) {
		this.t_author = t_author;
	}

	public String getT_type() {
		return t_type;
	}

	public void setT_type(String t_type) {
		this.t_type = t_type;
	}

	public String getT_subject() {
		return t_subject;
	}

	public void setT_subject(String t_subject) {
		this.t_subject = t_subject;
	}

	public String getT_title() {
		return t_title;
	}

	public void setT_title(String t_title) {
		this.t_title = t_title;
	}

	public String getT_pic() {
		return t_pic;
	}

	public void setT_pic(String t_pic) {
		this.t_pic = t_pic;
	}

	public String getT_content() {
		return t_content;
	}

	public void setT_content(String t_content) {
		this.t_content = t_content;
	}

	public Date getT_posttime() {
		return t_posttime;
	}

	public void setT_posttime(Date t_posttime) {
		this.t_posttime = t_posttime;
	}

	public Date getT_finishtime() {
		return t_finishtime;
	}

	public void setT_finishtime(Date t_finishtime) {
		this.t_finishtime = t_finishtime;
	}

}
