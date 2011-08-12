/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.awt.image.DataBufferUShort;

import org.jwebtop.core.service.CacheService;
import org.zengsource.umllearning.core.dao.TaskDao;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.util.IDUtil;
import org.zengsource.util.StringUtil;

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

	public TaskServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	public Task findById(String id) {
		if (StringUtil.isBlank(id)) {
			return null;
		}
		// search from cache
		Task task = (Task) this.cacheService.get(id);
		// search from database
		if (task == null) {
			task = this.taskDao.queryById(id);
		}
		// add to cache
		if (task != null) {
			this.cacheService.cache(id, task);
		}
		return task;
	}

	public void saveTask(Task task) {
		taskDao.saveTask(task);
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

}
