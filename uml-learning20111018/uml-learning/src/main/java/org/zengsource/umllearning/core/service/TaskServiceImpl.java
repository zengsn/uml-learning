/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.jwebtop.core.service.CacheService;
import org.zengsource.umllearning.core.dao.TaskDao;
import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 * 
 */
public class TaskServiceImpl implements TaskService {

	/**
	 * 
	 */

	private TaskDao taskDao;

	private CacheService cacheService;
	private TaskService taskService;
	
	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public TaskServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	public Task findById(String id) {
		return taskDao.queryById(id);
	}

	public TaskDao getTaskDao() {
		return taskDao;
	}

	public void setTaskDao(TaskDao taskDao) {
		this.taskDao = taskDao;
	}

	public CacheService getCacheService() {
		return cacheService;
	}

	public void setCacheService(CacheService cacheService) {
		this.cacheService = cacheService;
	}

	/**
	 * 通过标题查找问题或作业
	 */
	public Integer findByTitle(String title){
		return this.taskDao.queryByTitle(title);
	}
	
	/**
	 * 发布问题/作业
	 */
	public void saveTask(Task task) {
		taskDao.saveTask(task);
	}
	
	/**
	 * 更新问题/作业
	 */
	public void updateTask(Task task) {
		taskDao.updateTask(task);
	}

	/**
	 * 删除问题/作业
	 */
	public void delTask(Task task) {
		this.taskDao.delTask(task);
	}

	/**
	 * 根据条件查询相关问题或作业
	 */
	public List<?> query(Criterion[] criterions, int start, int limit) {
		return taskDao.queryTask(criterions, start, limit);
	}

	/**
	 * 取得符合条件的问题或作业总数
	 */
	public Integer getCount(Criterion[] criterions) {
		return taskDao.getCount(criterions);
	}

	/**
	 * 获取总数
	 */
	public Long getCount(String hql) {
		return taskDao.getCount(hql);
	}

	/**
	 * 查询问题或作业
	 */
	public List<?> query(String hql,int start,int limit) {
		return taskDao.queryTask(hql, start, limit);
	}

	/**
	 * 利用hql语句查询符合条件的问题或者作业
	 */
	public List<?> query(String hql) {
		return taskDao.query(hql);
	}

	/**
	 * 利用sql语句查询符合条件的问题或者作业
	 */
	public List<?> querySql(String sql) {
		// TODO Auto-generated method stub
		return taskDao.querySql(sql);
	}

	/**
	 * 根据sql语句查询符合条件的问题或者作业的总记录数
	 */
	public BigInteger getCountSql(String sql) {
		// TODO Auto-generated method stub
		return taskDao.getCountSql(sql);
	}


}
