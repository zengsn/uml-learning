/**
 * 
 */
package org.zengsource.umllearning.core.dao;

import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 *
 */
public interface HomeworkDao {

	public Homework queryById(String id);
	
	public void saveHomework(Homework h);
	
	public void doTask(Task t, Homework h);
	
}
