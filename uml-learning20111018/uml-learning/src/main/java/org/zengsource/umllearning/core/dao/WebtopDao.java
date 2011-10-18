
package org.zengsource.umllearning.core.dao;

import java.util.List;

import org.zengsource.umllearning.core.model.Webtop;


public interface WebtopDao {

	public boolean saveConfig(Webtop webware);
	
	public List<?> readRoleConfig(String role, int start, int limit);
	
	public Object queryByWid(String wid);
	
	public List<?> query(String wid);

	public void updateConfig(Object object);
}
