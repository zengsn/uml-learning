package org.zengsource.umllearning.core.web;

import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.TaskService;
import org.zengsource.util.IDUtil;

public class TaskAction extends MultipleAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private TaskService taskService;

	public TaskAction() {
		// TODO Auto-generated constructor stub
	}

	public void doSaveTask(){
		
		Task t = new Task();
		
//		t.setT_id(IDUtil.generate());
//		t.setT_author("hzucmj");
//		t.setT_title(t.getT_title());
//		t.setT_type(t.getT_type());
//		t.setT_subject(t.getT_subject());
//		t.setT_content(t.getT_content());
//		t.setT_pic(t.getT_pic());
//		t.setT_posttime(t.getT_posttime());
//		t.setT_finishtime(t.getT_finishtime());
		
		System.out.println(this.getRequest().getParameter("title"));
		taskService.saveTask(t);
	}
	
	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

}
