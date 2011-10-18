
package org.zengsource.umllearning.core.service;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.zengsource.umllearning.core.dao.WebtopDao;
import org.zengsource.umllearning.core.model.Webtop;
import org.zengsource.util.NumberUtil;

public class WebtopServiceImpl implements WebtopService {

	WebtopDao webtopDao;
	
	public WebtopDao getWebtopDao() {
		return webtopDao;
	}

	public void setWebtopDao(WebtopDao webtopDao) {
		this.webtopDao = webtopDao;
	}

	/**
	 * 保存配置信息
	 * @param path
	 * @return boolean
	 */
	public boolean saveConfig(String path) {
		Webtop w = loadFromXml(path);
		//判断数据库中是否存在该条记录
		List<?> list=this.query(w.getWid());
		if(list.size()>0){
//			Webtop we=(Webtop)this.query(w.getWid()).get(0);
			//如果存在，则更新
			w.setCreatedTime(new Date());
			this.updateConfig(w);
		} else {
			//不存在，则创建
			w.setCreatedTime(new Date());
			this.webtopDao.saveConfig(w);
		}
		return true;
	}

	public List<?> readRoleConfig(String role, int start, int limit) {
		return null;
	}


	//从xml文件读取配置信息
	public Webtop loadFromXml(String path) {
		File file = new File(path);
		
		SAXReader saxReader = new SAXReader();
		try {
			Document doc = saxReader.read(file);
			Webtop webware = new Webtop();
			Element root = doc.getRootElement();
			List<?> elements1 = root.elements();
			for (Object obj1 : elements1) {
				Element element1 = (Element) obj1;
				String element1Name = element1.getName();
				if ("status".equals(element1Name)) {
					int status = NumberUtil.string2Integer(element1.getText(), 0);
					webware.setStatus(status);
				} else if ("styles".equals(element1Name)) {
					List<?> styles = element1.elements();
					for (Object obj2 : styles) {
						Element elementStyle = (Element) obj2;
						webware.addStyle(elementStyle.getText() + "");
					}
				} else if ("jsSources".equals(element1Name)) {
					List<?> jsSources = element1.elements();
					for (Object obj2 : jsSources) {
						Element elementJsSource = (Element) obj2;
						webware.addJsSource(elementJsSource.getText() + "");
					}
				} else if ("acl".equals(element1Name)) {
					List<?> acls = element1.elements();
					for (Object obj2 : acls) {
						Element elementAcl = (Element) obj2;
						webware.addAcl(elementAcl.getName() + "", elementAcl.getText() + "");
					}
				} else if (element1.isTextOnly()) { // simple set
					try {
						BeanUtils.setProperty(webware, element1Name, element1.getText());
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else { // nesting

				}
			}
			return webware;
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}

	public Webtop queryByWid(String wid) {
		System.out.println("wid-------------------->"+wid);
		String hql="from Webtop wt where wt.wid='"+wid+"'";
		System.out.println(hql);
		return (Webtop) this.webtopDao.queryByWid(hql);
	}
	
	/**
	 * 根据配置id查询配置信息
	 */
	public List<?> query(String wid) {
		String query="from Webtop wt where wt.wid='"+wid+"'";
		return this.webtopDao.query(query);
	}

	/**
	 * 更新配置信息
	 */
	public void updateConfig(Webtop webtop) {
		this.webtopDao.updateConfig(webtop);
	}

}
