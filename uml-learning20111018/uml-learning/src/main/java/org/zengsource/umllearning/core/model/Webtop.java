
package org.zengsource.umllearning.core.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.zengsource.util.StringUtil;


public class Webtop implements Serializable {

	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public static final int DISABLED = 0;
	public static final int ENABLED = 1;

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private String wid;
	private String name;
	private String version;
	private String author;
	private String release;

	private String screen;
	private String logo;
	private String icon;
	
	private String description;

//	private String versions;
	private Set<String> versionSet;
	private String currentVersion;
//	private String acl;
	
	private int status = DISABLED;
	
//	private String styles;
	private List<String> styleList;
	
//	private String jsSources;
	private List<String> jsSourceList;
	private String jsClass;
	private String springContext;
	
	// private String acl;
	private Map<String, String> aclMap;
	
	private Date createdTime;
	
	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	public Webtop() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 判断是否有最新版本。
	 */
	public boolean isUpgradable() {
		if (this.versionSet == null) {
			return false;
		}
		for (Iterator<String> iter = this.versionSet.iterator(); iter.hasNext();) {
			String version = iter.next();
			if (version != null && version.equals(currentVersion)) {
				return iter.hasNext();
			}
		}
		return false;
	}

	/**
	 * 添加支持的版本号。
	 * 
	 * @param version
	 */
	public void addVersion(String version) {
		if (StringUtil.isBlank(version)) {
			return;
		}
		if (this.versionSet == null) {
			this.versionSet = new TreeSet<String>();
		}
		this.versionSet.add(version);
	}

	/**
	 * 将支持的版本号转换成版本字符串保存。
	 * 
	 * @return
	 */
	public String getVersions() {
		if (this.versionSet == null) {
			return "";
		}
		StringBuffer versionSB = new StringBuffer();
		for (String version : this.versionSet) {
			versionSB.append(version).append(",");
		}
		if (versionSB.charAt(versionSB.length() - 1) == ',') {
			versionSB.deleteCharAt(versionSB.length() - 1);
		}
		return versionSB.toString();
	}

	/**
	 * 将数据库的版本号字符串转换成版本集。
	 * 
	 * @param versions
	 */
	public void setVersions(String versions) {
		if (this.versionSet == null) {
			this.versionSet = new TreeSet<String>();
		} else {
			this.versionSet.clear();
		}
		if (StringUtil.isBlank(versions)) {
			return;
		}
		String[] versionArr = versions.split(",");
		for (String version : versionArr) {
			if (StringUtil.notBlank(version)) {
				this.versionSet.add(version);
			}
		}
	}

	/**
	 * 添加样式表 CSS 文件路径。
	 * 
	 * @param styleCss
	 */
	public void addStyle(String styleCss) {
		if (this.styleList == null) {
			this.styleList = new ArrayList<String>();
		}
		this.styleList.add(styleCss);
	}

	/**
	 * 将样式表列表转换成字符串 styles 保存。
	 * 
	 * @return
	 */
	public String getStyles() {
		if (this.styleList == null) {
			return "";
		}
		StringBuffer styleString = new StringBuffer();
		for (String style : styleList) {
			styleString.append(style + ",");
		}
		if (styleString.length()>0 &&styleString.charAt(styleString.length() - 1) == ',') {
			styleString.deleteCharAt(styleString.length() - 1);
		}
		return styleString.toString();
	}

	/**
	 * 将数据库保存的样式列表字符串转换成 styleList。
	 * 
	 * @param styles
	 */
	public void setStyles(String styles) {
		if (this.styleList == null) {
			this.styleList = new ArrayList<String>();
		} else {
			this.styleList.clear();
		}
		if (styles == null) {
			return;
		}
		String[] styleArr = styles.split(",");
		for (String style : styleArr) {
			if (StringUtil.notBlank(style)) {
				this.styleList.add(style);
			}
		}
	}

	/**
	 * 增加访问控制权限项。
	 * 
	 * @param authority
	 * @param roles
	 */
	public void addAcl(String authority, String roles) {
		if (this.aclMap == null) {
			this.aclMap = new HashMap<String, String>();
		}
		this.aclMap.put(authority, roles);
	}

	/**
	 * 将 aclMap 转成字符串 acl 保存。
	 * 
	 * @return
	 */
	public String getAcl() {
		if (aclMap == null) {
			return "";
		}
		StringBuffer aclString = new StringBuffer();
		for (String key : aclMap.keySet()) {
			aclString.append(key + ":" + aclMap.get(key) + ",");
		}
		if (aclString.charAt(aclString.length() - 1) == ',') {
			aclString.deleteCharAt(aclString.length() - 1);
		}
		return aclString.toString();
	}

	/**
	 * 将数据库保存的 acl 转换成 aclMap。
	 * 
	 * @param acl
	 */
	public void setAcl(String acl) {
		if (this.aclMap == null) {
			this.aclMap = new HashMap<String, String>();
		} else {
			this.aclMap.clear();
		}
		if (acl == null) {
			return;
		}
		String[] aclItem = acl.split(",");
		for (String item : aclItem) {
			String[] pair = item.split(":");
			if (StringUtil.notBlank(pair[0])) {
				this.aclMap.put(pair[0], pair[1]);
			}
		}
	}

	/**
	 * 添加JS源码路径。
	 * 
	 * @param source
	 */
	public void addJsSource(String source) {
		if (this.jsSourceList == null) {
			this.jsSourceList = new ArrayList<String>();
		}
		this.jsSourceList.add(source);
	}

	/**
	 * 将JS源码列表转换成字符串 jsSources 保存在数据库中。
	 * 
	 * @return
	 */
	public String getJsSources() {
		if (this.jsSourceList == null) {
			return "";
		}
		StringBuffer jsSourceSB = new StringBuffer();
		for (String source : this.jsSourceList) {
			jsSourceSB.append(source).append(",");
		}
		if (jsSourceSB.charAt(jsSourceSB.length() - 1) == ',') {
			jsSourceSB.deleteCharAt(jsSourceSB.length() - 1);
		}
		return jsSourceSB.toString();
	}

	/**
	 * 将数据库中的JS源码字符串转换成源码列表jsSourceList。
	 * 
	 * @param jsSources
	 */
	public void setJsSources(String jsSources) {
		if (this.jsSourceList == null) {
			this.jsSourceList = new ArrayList<String>();
		} else {
			this.jsSourceList.clear();
		}
		if (jsSources == null) {
			return;
		}
		String[] jsSourceArr = jsSources.split(",");
		for (String source : jsSourceArr) {
			this.jsSourceList.add(source);
		}
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public String getWid() {
		return wid;
	}

	public void setWid(String wid) {
		this.wid = wid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getRelease() {
		return release;
	}

	public void setRelease(String release) {
		this.release = release;
	}

	public String getScreen() {
		return screen;
	}

	public void setScreen(String screen) {
		this.screen = screen;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<String> getVersionSet() {
		return versionSet;
	}

	public void setVersionSet(Set<String> versionSet) {
		this.versionSet = versionSet;
	}

	public String getCurrentVersion() {
		return currentVersion;
	}

	public void setCurrentVersion(String currentVersion) {
		this.currentVersion = currentVersion;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public List<String> getStyleList() {
		return styleList;
	}

	public void setStyleList(List<String> styleList) {
		this.styleList = styleList;
	}

	public List<String> getJsSourceList() {
		return jsSourceList;
	}

	public void setJsSourceList(List<String> jsSourceList) {
		this.jsSourceList = jsSourceList;
	}

	public String getJsClass() {
		return jsClass;
	}

	public void setJsClass(String jsClass) {
		this.jsClass = jsClass;
	}

	public String getSpringContext() {
		return springContext;
	}

	public void setSpringContext(String springContext) {
		this.springContext = springContext;
	}

	public Map<String, String> getAclMap() {
		return aclMap;
	}

	public void setAclMap(Map<String, String> aclMap) {
		this.aclMap = aclMap;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

}
