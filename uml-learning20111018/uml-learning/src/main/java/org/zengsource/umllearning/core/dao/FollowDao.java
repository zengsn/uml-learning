package org.zengsource.umllearning.core.dao;

import java.util.List;

import org.zengsource.umllearning.core.model.Follow;

public interface FollowDao {
	/**
	 * @author swyma
	 */
	
	
	//取得总数
	public Long getCount(String hql);
	
	//分页取数据
	public List<?> queryFollow(String hql,int start,int limit);
	
	//addFollower
	public void save(Follow follow);
	
	//deleteFollower
	public void delete(String hql);
}
