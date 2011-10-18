package org.zengsource.umllearning.core.web;

import java.math.BigInteger;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.model.Authority;
import org.zengsource.umllearning.core.model.Register;
import org.zengsource.umllearning.core.service.AuthorityService;
import org.zengsource.umllearning.core.service.RegisterService;
import org.zengsource.util.DateUtil;
import org.zengsource.util.IDUtil;

public class RegisterAction extends MultipleAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private RegisterService registerService;

	private String uname;
	private String upwd;
	private String urepwd;
	private String old_pwd;

	private String uemail;
	private Date ucreatedtime;
	private Date uupdatedtime;

	private String inviteCode;

	private AuthorityService authService;
	
	private String limit;
	private String start;
	

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getUpwd() {
		return upwd;
	}

	public void setUpwd(String upwd) {
		this.upwd = upwd;
	}

	public String getUrepwd() {
		return urepwd;
	}

	public void setUrepwd(String urepwd) {
		this.urepwd = urepwd;
	}

	public String getOld_pwd() {
		return old_pwd;
	}

	public void setOld_pwd(String old_pwd) {
		this.old_pwd = old_pwd;
	}

	public String getUemail() {
		return uemail;
	}

	public void setUemail(String uemail) {
		this.uemail = uemail;
	}

	public Date getUcreatedtime() {
		return ucreatedtime;
	}

	public void setUcreatedtime(Date ucreatedtime) {
		this.ucreatedtime = ucreatedtime;
	}

	public Date getUupdatedtime() {
		return uupdatedtime;
	}

	public void setUupdatedtime(Date uupdatedtime) {
		this.uupdatedtime = uupdatedtime;
	}

	public String getInviteCode() {
		return inviteCode;
	}

	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}

	public AuthorityService getAuthService() {
		return authService;
	}

	public void setAuthService(AuthorityService authService) {
		this.authService = authService;
	}

	public RegisterService getRegisterService() {
		return registerService;
	}

	public void setRegisterService(RegisterService registerService) {
		this.registerService = registerService;
	}

	/**
	 * 注册用户
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doSaveUser() throws MvcException {
		System.out.println("Add a new user ...");
		String id = IDUtil.generate();
		String role = "ROLE_USER";
		String username = this.getUname();
		String password = this.getUpwd();
		String email = this.getUemail();
		String inviteCode = this.getInviteCode();

		System.out.println(inviteCode);

		if (inviteCode.equals("hzu")) {// 判断邀请码是否正确
			if (this.registerService.queryByName(username) == null) {// 判断数据库是否有重名
				Register register = new Register();
				register.setId(id);
				register.setUsername_(username);
				register.setPassword_(password);
				register.setEmail_(email);
				register.setCreatedtime_(DateUtil.now());
				register.setUpdatedtime_(DateUtil.now());
				// 保存用户
				this.registerService.save(register);

				Authority authority = new Authority();
				authority.setAid(id);
				authority.setAuthority(role);
				// 赋予新用户权限
				this.authService.saveAuthority(authority);

				return new HtmlView("{success : true, msg : '注册成功，请返回登录页面登录！'}");
			} else {
				return new HtmlView("{success : false, msg : '注册失败，用户已存在！'}");
			}

		}
		return new HtmlView("{success : false, msg : '注册失败，邀请码错误！'}");

	}

	/**
	 * 维护个人信息
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doUpdateUser() throws MvcException {
		String password = this.getUpwd();
		String oldpwd = this.getOld_pwd();
		String username = SecurityContextHolder.getContext()
				.getAuthentication().getName();
		Register r = new Register();
		r = this.registerService.queryByName(username);
		if (r != null) {
			if (r.getPassword_().equals(oldpwd)) {
				r.setPassword_(password);
				this.registerService.updateUser(r);
				return new HtmlView("{success : true, msg : '个人信息更新成功！'}");
			} else {
				return new HtmlView("{success : false, msg : '旧密码错误！'}");
			}
		}
		return new HtmlView("{success : false, msg : '不存在此用户！'}");
	}

	/**
	 * 加载个人信息数据 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doLoadInfo() throws MvcException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		logger.info("Loading " + username + "'s data.");
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Collection<GrantedAuthority> auth = userDetails.getAuthorities();  
		String role = "";
		for(GrantedAuthority g : auth){
			role = g.getAuthority();
		}  
		
		//role = (role.equals("ROLE_USER")) ? "普通用户" : "教师";
		if (role.equals("ROLE_ADMIN")) {
			role = "管理员";
		} else if (role.equals("ROLE_TEACHER")) {
			role = "教师";
		} else if (role.equals("ROLE_STUDENT")) {
			role = "学生";
		} else {
			role = "游客";
		}
		
		Register r = new Register();
		r = this.registerService.queryByName(username);
		
		
		if (r != null){
			StringBuffer sb = new StringBuffer("{");
			sb.append("\"success\" : true,");
			//
			sb.append("\"data\" : {");
			sb.append("\"uid\" : \"" + r.getId() + "\"");
			sb.append(", \"uname\" : \"" + username + "\"");
			sb.append(",\"utype\": \"" + role + "\"");
			sb.append("},");
			//
			sb.deleteCharAt(sb.length() - 1);
			sb.append("}");
			System.out.println(sb.toString());
			return new HtmlView(sb.toString());
		}
		return new HtmlView("{success : false, msg : '数据加载失败！'}");
	}

	
	/**
	 * 用户列表信息显示，关注使用
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doAllUsers() throws MvcException {
		//获取当前用户姓名
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		//总数
		String userCount="select count(username_) from users where username_<> '"+username+"' and username_ not in (select f_follow from tb_follow where f_follower='"+username+"')";
		BigInteger count=registerService.count(userCount);
		//用户列表
		String sql="select username_ from users where username_<> '"+username+"' and username_ not in (select f_follow from tb_follow where f_follower='"+username+"')";
		List<?> userList=registerService.queryAllUsers(sql, new Integer(start),new Integer(limit));
		StringBuffer sb=new StringBuffer();
		if(userList.size()>0){
			sb.append("{success:true,\"total\":\"").append(count).append("\",\"root\":[");
			for(int i=0;i<userList.size();i++){
				sb.append("{\"username_\":\"").append(userList.get(i)).append("\"},");
			}
			sb.deleteCharAt(sb.length()-1);
			sb.append("]}");
			System.out.println(sb.toString());
			return new HtmlView(sb.toString());
		}else{
			return new HtmlView("{success:true,total:0,root:[]}");
		}
	}
	
}
