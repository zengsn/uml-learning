package org.zengsource.umllearning.core.web;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.Cookie;

import org.apache.commons.fileupload.FileItem;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipartAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.TaskService;
import org.zengsource.util.IDUtil;
import org.zengsource.util.StringUtil;

public class SaveTaskAction extends MultipartAction {

	/**
	 * @author hzucmj
	 */
	private static final long serialVersionUID = 1L;

	private TaskService taskService;

	private String t_author;
	private String t_type;
	private String t_subject;
	private String t_title;
	private String t_pic;
	private String t_content;
	private String t_finishtime;
	private String filename;
	private String currentUser;
	
	private Map<String, FileItem> fileMap;

	
	
	public SaveTaskAction() {

	}

	/**
	 * 发布问题或作业
	 */
	@Override
	protected AbstractView doService() throws MvcException {
		currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("current user : " + currentUser);
		t_author = currentUser;
		if (this.getT_type().equals("task")){
			if (this.taskService.findByTitle(this.getT_title()) > 0){
				return new HtmlView("{failure : true, msg : '作业标题已存在，请更换标题！'}");
			}
		}
		Task t = new Task();
		t.setId(IDUtil.generate());
		t.setAuthor(this.getT_author());
		t.setType(this.getT_type());
		
		t.setSubject(this.getT_subject());
		t.setTitle(this.getT_title());
		fileUpload();
		if (StringUtil.isBlank(this.getT_pic())) {
			String str = "";
			
			Cookie[] cookie = this.getRequest().getCookies();
			
			if (cookie != null){
				for (int i = 0; i < cookie.length; i++){
					if (cookie[i].getName().equals("canvasXmlData-" + currentUser)){
						str = cookie[i].getValue();
						System.out.println("xml : " + str);
					}
					if (i >= cookie.length){
						//cookie中无内容
					}
				}
			}
			t.setPic(str);
		} else {
			t.setPic(this.getT_pic().toLowerCase());
		}
		t.setContent(this.getT_content());
		t.setPosttime(new Date());

		String ft = this.getT_finishtime();
		if (ft != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date;
			try {
				date = sdf.parse(this.getT_finishtime());
				t.setFinishtime(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} else {
			t.setFinishtime(null);
		}
		taskService.saveTask(t);
		return new HtmlView("{success: true, msg : '发布问题成功！'}");
	}

	public void fileUpload() {

		String rootPath = getContext().getRootPath();
		File usrDir = new File(rootPath + "/upload/");
		if (!usrDir.exists() || usrDir.isFile()){
			usrDir.mkdirs();
		}
		FileItem picItem = getFileItem("t_img");
		if (picItem != null) {
			String str = IDUtil.generate("img");
			String uploadName = picItem.getName();
			filename = str + uploadName.substring(uploadName.lastIndexOf("."));
			File diskFile = saveFile("t_img", usrDir + "/" + str);
			if (diskFile != null) {
				this.setT_pic(filename.toLowerCase());
			}
		}

	}

	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
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

	public void setT_finishtime(String t_finishtime) {
		this.t_finishtime = t_finishtime;
	}

	public String getT_finishtime() {
		return t_finishtime;
	}

	public Map<String, FileItem> getFileMap() {
		return fileMap;
	}

	public void setFileMap(Map<String, FileItem> fileMap) {
		this.fileMap = fileMap;
	}

}
