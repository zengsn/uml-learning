package org.zengsource.umllearning.core.service;

import java.math.BigInteger;
import java.util.List;

import org.zengsource.umllearning.core.model.Register;

public interface RegisterService {

	public void save(Register register);
	
	public Register queryByName(String name);
	
	public void updateUser(Register register);
	
	public List<?> queryAllUsers(String sql,int start,int limit);
	
	public BigInteger count(String sql);
}
