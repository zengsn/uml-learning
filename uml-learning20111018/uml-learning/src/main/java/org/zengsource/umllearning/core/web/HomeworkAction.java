/**
 * 
 */
package org.zengsource.umllearning.core.web;

import java.io.File;
import java.util.Date;

import javax.servlet.http.Cookie;

import org.apache.commons.fileupload.FileItem;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipartAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.HomeworkService;
import org.zengsource.util.IDUtil;
import org.zengsource.util.StringUtil;

/**
 * @author hzucmj
 * 
 */
public class HomeworkAction extends MultipartAction {

	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */

	private String id;
	private String title;
	private String subject;
	private String posttime;
	private String finishtime;
	private String t_content;
	private String t_pic;

	private String filename;
	private String currentUser;
	
	private HomeworkService homeworkService;

	public HomeworkAction() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 学生完成作业相关操作
	 */
	@Override
	public AbstractView doService() throws MvcException {
		currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
		
		String username = currentUser;

		this.fileUpload();
		System.out.println(this.filename);
		
		
		Task t = new Task();
		String hid = IDUtil.generate();
		
		t.setId(hid);
		t.setTitle(this.getTitle());
		t.setAuthor(username);
		t.setContent(this.getT_content());
		t.setSubject(this.getSubject());
		t.setType("homework");
		t.setPosttime(new Date());
		t.setFinishtime(null);
		//fileUpload();
		//t.setPic(this.getT_pic().toLowerCase());
		
		if (StringUtil.isBlank(this.getT_pic())){
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
		
		Homework h = new Homework();
		String csid = IDUtil.generate();
		
		h.setCsId(csid);
		h.setCsName(username);
		h.setTid(this.getId());
		h.setCsHomeworkId(hid);
		h.setCsScore("");
		h.setCsFlag(false);
		
		this.homeworkService.doHomework(t, h);
		
		return new HtmlView("{success : true, msg : '提交作业成功！'}");
	}

	/**
	 * 上传文件方法
	 */
	public void fileUpload(){
		String rootPath = getContext().getRootPath();
		System.out.println("rootPath : " + rootPath);
		File usrDir = new File(rootPath + "/upload/");
		if (! usrDir.exists() || usrDir.isFile()){
			usrDir.mkdirs();
		}
		FileItem picItem = getFileItem("t_pic");
		if (picItem != null) {
			String str = IDUtil.generate("img");
			String uploadName = picItem.getName();
			filename = str + uploadName.substring(uploadName.lastIndexOf("."));
			File diskFile = saveFile("t_pic", usrDir + "/" + str);
			if (diskFile != null) {
				this.setT_pic(filename.toLowerCase());
			}
		}
	}
	
	public HomeworkService getHomeworkService() {
		return homeworkService;
	}

	public void setHomeworkService(HomeworkService homeworkService) {
		this.homeworkService = homeworkService;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getPosttime() {
		return posttime;
	}

	public void setPosttime(String posttime) {
		this.posttime = posttime;
	}

	public String getFinishtime() {
		return finishtime;
	}

	public void setFinishtime(String finishtime) {
		this.finishtime = finishtime;
	}

	public String getT_content() {
		return t_content;
	}

	public void setT_content(String t_content) {
		this.t_content = t_content;
	}

	public String getT_pic() {
		return t_pic;
	}

	public void setT_pic(String t_pic) {
		this.t_pic = t_pic;
	}

}
