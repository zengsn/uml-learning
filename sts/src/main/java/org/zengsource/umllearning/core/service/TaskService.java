/**
 * 
 */
package org.zengsource.umllearning.core.service;

import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 *
 */
public interface TaskService {

	public Task findById(String id);
	
	public void saveTask(Task task);
	
}
