package org.zengsource.umllearning.core.web;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.service.WebtopService;
import org.zengsource.util.StringUtil;

public class WebtopAction extends MultipleAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	WebtopService webtopService;

	private String cmpName;
	private String cmpVersion;


	public String getCmpName() {
		return cmpName;
	}

	public void setCmpName(String cmpName) {
		this.cmpName = cmpName;
	}

	public String getCmpVersion() {
		return cmpVersion;
	}

	public void setCmpVersion(String cmpVersion) {
		this.cmpVersion = cmpVersion;
	}

	public WebtopService getWebtopService() {
		return webtopService;
	}

	public void setWebtopService(WebtopService webtopService) {
		this.webtopService = webtopService;
	}
	
	/**
	 * 更新配置信息
	 * @return
	 * @throws MvcException
	 */
	@SuppressWarnings("deprecation")
	public AbstractView doSaveConfig() throws MvcException {
		if (!StringUtil.isBlank(this.getCmpName())){
			String path = this.getRequest().getRealPath("/") + this.getCmpName() + "/" + this.getCmpVersion() + "/webware.xml";
			System.out.println(path);
			this.webtopService.saveConfig(path);
			return new HtmlView("模块升级成功！");
		}
		return new HtmlView("模块升级失败！");
	}
}
