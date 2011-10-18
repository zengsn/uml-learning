package org.zengsource.umllearning.core.service;

import java.util.List;

import org.zengsource.umllearning.core.model.Follow;

/**
 * 
 * @author swyma
 *
 */
public interface FollowService {
	//取得总数
	public Long getCount(String hql);
	
	//分页取数据
	public List<?> queryFollow(String hql,int start,int limit); 
	
	public void save(Follow follow);
	
	public void delete(String hql);
}
