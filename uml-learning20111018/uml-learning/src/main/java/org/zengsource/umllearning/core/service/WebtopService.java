/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.util.List;

import org.zengsource.umllearning.core.model.Webtop;



public interface WebtopService {

	public boolean saveConfig(String path);
	
	public List<?> readRoleConfig(String role, int start, int limit);
	
	public Webtop queryByWid(String wid);
	
	public List<?> query(String wid);

	public void updateConfig(Webtop webtop);
}
