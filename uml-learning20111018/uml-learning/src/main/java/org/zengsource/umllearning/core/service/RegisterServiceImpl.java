package org.zengsource.umllearning.core.service;

import java.math.BigInteger;
import java.util.List;

import org.zengsource.umllearning.core.dao.RegisterDao;
import org.zengsource.umllearning.core.model.Register;

public class RegisterServiceImpl implements RegisterService{

	RegisterDao registerDao;

	public RegisterDao getRegisterDao() {
		return registerDao;
	}

	public void setRegisterDao(RegisterDao registerDao) {
		this.registerDao = registerDao;
	}

	/**
	 * 注册用户信息
	 */
	public void save(Register register) {
		this.registerDao.save(register);
	}

	/**
	 * 通过名字查找用户
	 */
	public Register queryByName(String name) {
		return (Register) this.registerDao.queryByName(name);
	}

	/**
	 * 更新用户信息
	 */
	public void updateUser(Register register) {
		this.registerDao.update(register);
	}

	/**
	 * 查询所有用户
	 */
	public List<?> queryAllUsers(String sql, int start, int limit) {
		return registerDao.queryAllUsers(sql, start, limit);
	}

	/**
	 * 返回用户总数量
	 */
	public BigInteger count(String sql) {
		return registerDao.count(sql);
	}
	
}
