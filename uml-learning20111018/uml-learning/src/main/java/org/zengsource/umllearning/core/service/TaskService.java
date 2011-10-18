/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.zengsource.umllearning.core.model.Task;

/**
 * @author hzucmj
 * 
 */
public interface TaskService {

	public Task findById(String id);
	
	public Integer findByTitle(String title);

	public void saveTask(Task task);
	
	public void updateTask(Task task);
	
	public void delTask(Task task);

	/**
	 * @author swyma
	 */

	// 取得记录总数
	public Integer getCount(Criterion[] criterions);

	// add by swyma
	public List<?> query(Criterion[] criterions, int start, int limit);

	public Long getCount(String hql);

	public List<?> query(String hql, int start, int limit);

	public List<?> query(String hql);

	public List<?> querySql(String sql);

	public BigInteger getCountSql(String sql);
}
