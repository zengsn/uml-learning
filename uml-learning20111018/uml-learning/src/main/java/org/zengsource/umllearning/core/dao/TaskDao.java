package org.zengsource.umllearning.core.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.zengsource.umllearning.core.model.Task;

public interface TaskDao {
	
	/**
	 * 
	 * @author hzucmj
	 * 
	 */
	
	public Task queryById(String q);
	
	public Integer queryByTitle(String title);
	
	public void saveTask(Task task);
	
	public void updateTask(Task task);
	
	public void delTask(Task task);
	
	/**
	 * 
	 * @author swyma
	 * 
	 */
	//取得总数
	public Integer getCount(Criterion[] criterions);
	//分页显示
	public List<?> queryTask(Criterion[] criterions, int start, int limit);
	
	//取得总数
	public Long getCount(String hql);
	
	//分页取数据
	public List<?> queryTask(String hql,int start,int limit);
	
	public List<?> query(String hql);
	
	public List<?> querySql(String sql);
	
	public BigInteger getCountSql(String sql);
}
