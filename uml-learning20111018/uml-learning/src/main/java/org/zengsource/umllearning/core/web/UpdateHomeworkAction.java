/**
 * 
 */
package org.zengsource.umllearning.core.web;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.service.HomeworkService;

/**
 * @author hzucmj
 *
 */
public class UpdateHomeworkAction extends MultipleAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String t_id;
	private String t_score;
	
	private HomeworkService homeworkService;

	public UpdateHomeworkAction() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 更新作业信息
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doUpdateHomework() throws MvcException {
		String id = this.getT_id();
		String score = this.getT_score();
		System.out.println(id + "/" + score);
		//Homework h = this.homeworkService.findById("20110826161636384");
		Homework h = this.homeworkService.findById(id);
		if (h != null){
			System.out.println(h.getCsName());
			h.setCsScore(score);
			h.setCsFlag(true);
			this.homeworkService.saveHomework(h);
			return new HtmlView("{success : true, msg : '提交成功！'}");
		} 
		return new HtmlView("{failure : true, msg : '提交失败！'}");
	}

	public String getT_id() {
		return t_id;
	}

	public void setT_id(String t_id) {
		this.t_id = t_id;
	}

	public String getT_score() {
		return t_score;
	}

	public void setT_score(String t_score) {
		this.t_score = t_score;
	}

	public HomeworkService getHomeworkService() {
		return homeworkService;
	}

	public void setHomeworkService(HomeworkService homeworkService) {
		this.homeworkService = homeworkService;
	}

}
