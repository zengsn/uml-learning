/**
 * 
 */
package org.zengsource.umllearning.core.web;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.umllearning.core.service.WebtopService;

public class IndexAction extends MultipleAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private WebtopService webtopService;

	private String role;

	public WebtopService getWebtopService() {
		return webtopService;
	}

	public void setWebtopService(WebtopService webtopService) {
		this.webtopService = webtopService;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	/**
	 * 根据不同角色获取不同的配置信息
	 */
	@Override
	protected AbstractView doService() throws MvcException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Collection<GrantedAuthority> auth = userDetails.getAuthorities();  
		String role = "";
		for(GrantedAuthority g : auth){
			role = g.getAuthority();
		}  
		String wid = "";
		if (role.equals("ROLE_ADMIN")){
			wid  = "administrator";
		} else if (role.equals("ROLE_STUDENT")) {
			wid = "student";
		} else if (role.equals("ROLE_TEACHER")){
			wid = "teacher";
		} else {
			wid = "Guest";
		}
		System.out.println(wid);
		//取出数据库的相应角色配置信息
		List<?> webConfig = this.webtopService.query(wid);
		//如果配置信息存在，则读取
		if (webConfig.size() > 0) {
			this.getRequest().setAttribute("webConfig", webConfig);
		} else {
			//如果没有，则创建管理员的配置信息
			@SuppressWarnings("deprecation")
			String path = this.getRequest().getRealPath("/") + wid + "/1.0.0/webware.xml"; 
			System.out.println(path);
			this.webtopService.saveConfig(path);
			List<?> webCfg = this.webtopService.query(wid);
			this.getRequest().setAttribute("webConfig", webCfg);
		}
		
        return super.doService();
	}

	public AbstractView doShowModule() throws MvcException {
		return null;
	}
}
