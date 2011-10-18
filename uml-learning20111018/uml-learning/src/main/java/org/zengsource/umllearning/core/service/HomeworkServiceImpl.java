/**
 * 
 */
package org.zengsource.umllearning.core.service;

import org.zengsource.umllearning.core.dao.HomeworkDao;
import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 * 
 */
public class HomeworkServiceImpl implements HomeworkService {

	/**
	 * 
	 */

	HomeworkDao homeworkDao;

	/**
	 * 构造函数
	 */
	public HomeworkServiceImpl() {
	}

	/**
	 * 学生完成作业
	 */
	public void doHomework(Task t, Homework h) {
		this.homeworkDao.doTask(t, h);
	}

	/**
	 * 保存作业
	 */
	public void saveHomework(Homework h) {
		this.homeworkDao.saveHomework(h);
	}
	
	public HomeworkDao getHomeworkDao() {
		return homeworkDao;
	}

	public void setHomeworkDao(HomeworkDao homeworkDao) {
		this.homeworkDao = homeworkDao;
	}

	public Homework findById(String id) {
		return this.homeworkDao.queryById(id);
	}


}
