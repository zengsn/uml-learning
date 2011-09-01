package org.zengsource.umllearning.core.dao;

import org.zengsource.umllearning.core.model.Task;

public interface TaskDao {
	
	public Task queryById(String id);
	
	public void saveTask(Task task);
	
}
