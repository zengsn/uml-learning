package org.zengsource.umllearning.core.service;

import org.zengsource.umllearning.core.dao.AuthorityDao;
import org.zengsource.umllearning.core.model.Authority;

public class AuthorityServiceImpl implements AuthorityService{
	
	AuthorityDao authDao;

	public AuthorityDao getAuthDao() {
		return authDao;
	}

	public void setAuthDao(AuthorityDao authDao) {
		this.authDao = authDao;
	}

	/**
	 * 保存用户权限信息
	 */
	public void saveAuthority(Authority auth) {
		this.authDao.save(auth);
	}
	
	

}
