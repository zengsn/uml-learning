package org.zengsource.umllearning.core.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.mvc.view.XmlView;
import org.zengsource.umllearning.core.model.Follow;
import org.zengsource.umllearning.core.service.FollowService;
import org.zengsource.util.IDUtil;

public class FollowAction extends MultipleAction {
	/**
	 * @author swyma
	 */
	private static final long serialVersionUID = 1L;
	private FollowService followService;

	public FollowService getFollowService() {
		return followService;
	}

	public void setFollowService(FollowService followService) {
		this.followService = followService;
	}

	private String id;
	private String follow;
	private String follower;
	private String limit;
	private String start;

	private String data;

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFollow() {
		return follow;
	}

	public void setFollow(String follow) {
		this.follow = follow;
	}

	public String getFollower() {
		return follower;
	}

	public void setFollower(String follower) {
		this.follower = follower;
	}

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

	@Override
	protected AbstractView doService() throws MvcException {
		// TODO Auto-generated method stub
		return super.doService();
	}

	/**
	 * 取得关注者的信息，列表显示
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doFollow() throws MvcException {
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		String followCount = "select count(follow.id) from Follow follow where follow.follower='"+ username + "'";
		Long count = followService.getCount(followCount);
		// 取得关注者的name
		String followQuery = "from Follow follow where follow.follower='"+ username + "'";
		List<?> follows = followService.queryFollow(followQuery, new Integer(start), new Integer(limit));
		// 创建xml文件
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("allfollows");
		for (int i = 0; i < follows.size(); i++) {
			Follow follow = (Follow) follows.get(i);
			Element followEle = root.addElement("follows");
			followEle.addElement("total").addText(count + "");
			followEle.addElement("id").addText(follow.getId());
			followEle.addElement("follow").addText(follow.getFollow());
			followEle.addElement("follower").addText(follow.getFollower());
			followEle.addElement("date").addText(dateFormate(follow.getDate()));
		}
		return new XmlView(doc);
	}

	/**
	 * 取得粉丝的信息，列表显示
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doFollower() throws MvcException {
		// TODO Auto-generated method stub
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String followCount = "select count(follow.id) from Follow follow where follow.follow='" + username + "'";
		Long count = followService.getCount(followCount);
		System.out.println(count);
		// 取得粉丝的name
		String followQuery = "from Follow follow where follow.follow='" + username + "'";
		List<?> follows = followService.queryFollow(followQuery, new Integer(start), new Integer(limit));

		// 创建xml文件
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("allfollows");
		for (int i = 0; i < follows.size(); i++) {
			Follow follow = (Follow) follows.get(i);
			Element followEle = root.addElement("follows");
			followEle.addElement("total").addText(count + "");
			followEle.addElement("id").addText(follow.getId());
			followEle.addElement("follow").addText(follow.getFollow());
			followEle.addElement("follower").addText(follow.getFollower());
			followEle.addElement("date").addText(dateFormate(follow.getDate()));
		}
		return new XmlView(doc);
	}

	/**
	 * 该方法为用户加关注
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doAddFollower() throws MvcException {
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String follower=getData();
		System.out.println(getData());
		Follow follow = new Follow();
		follow.setId(IDUtil.generate());
		follow.setFollow(follower);
		follow.setFollower(username);
		follow.setDate(new Date());
		followService.save(follow);
		return new HtmlView("{success:true}");
	}

	/**
	 * 该方法为用户移除粉丝
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doDeleteFollow() throws MvcException {
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String deletehql = "delete Follow follow where follow.follow='"+ username + "' and follow.follower='" + getData() + "'";
		followService.delete(deletehql);
		return new XmlView("{success:true}");
	}

	// 取消关注
	/**
	 * 该方法为用户取消关注
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doDeleteFollower() throws MvcException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String deletehql = "delete Follow follow where follow.follow='" + getData() + "' and follow.follower='" + username + "'";
		System.out.println(deletehql);
		followService.delete(deletehql);
		return new XmlView("{success:true}");
	}

	// format date
	/**
	 * 该方法为用户进行时间格式化
	 * @param date
	 * @return
	 */
	public String dateFormate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String formateDate = sdf.format(date);
		return formateDate;
	}

}
