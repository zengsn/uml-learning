package org.zengsource.umllearning.core.service;

import java.util.List;

import org.jwebtop.core.service.CacheService;
import org.zengsource.umllearning.core.dao.FollowDao;
import org.zengsource.umllearning.core.model.Follow;

public class FollowServiceImpl implements FollowService {

	private FollowDao followDao;
	private CacheService cacheService;
	
	public CacheService getCacheService() {
		return cacheService;
	}

	public void setCacheService(CacheService cacheService) {
		this.cacheService = cacheService;
	}

	public FollowDao getFollowDao() {
		return followDao;
	}

	public void setFollowDao(FollowDao followDao) {
		this.followDao = followDao;
	}

	/**
	 * 根据条件取得总数
	 */
	public Long getCount(String hql) {
		return followDao.getCount(hql);
	}

	/**
	 * 根据条件取得粉丝信息，列表显示
	 */
	public List<?> queryFollow(String hql, int start, int limit) {
		return followDao.queryFollow(hql, start, limit);
	}

	/**
	 * 根据条件保存数据
	 */
	public void save(Follow follow) {
		followDao.save(follow);
	}

	/**
	 * 根据条件删除数据
	 */
	public void delete(String hql) {
		followDao.delete(hql);
	}

}
