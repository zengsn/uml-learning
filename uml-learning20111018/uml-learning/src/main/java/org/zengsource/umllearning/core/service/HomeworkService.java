/**
 * 
 */
package org.zengsource.umllearning.core.service;

import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 *
 */
public interface HomeworkService {

	public Homework findById(String id);
	
	public void saveHomework(Homework h);
	
	public void doHomework(Task t, Homework h);
	
}
