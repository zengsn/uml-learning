package org.zengsource.umllearning.core.dao;

import java.math.BigInteger;
import java.util.List;

import org.zengsource.umllearning.core.model.Register;

public interface RegisterDao {

	public void save(Register register);
	
	public Object queryByName(String name);
	
	public void update(Register register);
	
	public List<?> queryAllUsers(String sql,int start,int limit);
	
	public BigInteger count(String sql);
}
