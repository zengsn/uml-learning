/**
 * 
 */
package org.zengsource.umllearning.core.web;

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
import org.zengsource.umllearning.core.model.Comment;
import org.zengsource.umllearning.core.service.CommentService;
import org.zengsource.util.DateUtil;
import org.zengsource.util.IDUtil;

/**
 * @author hzucmj
 * 
 */
public class CommentAction extends MultipleAction {

	private String tid;
	private String comment;
	private CommentService commentService;

	private String currentUser;

	private String limit;

	private String start;

	private static final long serialVersionUID = 1L;

	public CommentAction() {
	}

	/**
	 * 添加评论
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doAddComment() throws MvcException {
		currentUser = SecurityContextHolder.getContext().getAuthentication()
				.getName();
		String cid = IDUtil.generate();
		String cname = currentUser;

		Comment c = new Comment();
		c.setId(cid);
		c.setTid(this.getTid());
		c.setCname(cname);
		c.setCcontent(this.getComment());
		c.setCposttime(new Date());

		commentService.insertComment(c);

		return new HtmlView("{success : true, msg : '发布评论成功！'}");
	}

	/**
	 * 显示所有评论
	 * @return
	 * @throws MvcException
	 */
	@SuppressWarnings("unchecked")
	public AbstractView doShowAll() throws MvcException {
		int start = Integer.parseInt(this.getStart());
		int limit = Integer.parseInt(this.getLimit());

		String str = "select count(c) from Comment c";

		System.out.println(this.getTid());

		// String hql = "from Comment c where c.tid = '" + this.getTid() + "'";
		Long totalCount = this.commentService.queryCount(str);

		System.out.println(totalCount);

		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("comments").addAttribute("success",
				"true");
		if (totalCount == 0) {
			root.addElement("total").addText("0");
		} else {
			root.addElement("total").addText(totalCount + "");
			List<Comment> commentList = (List<Comment>) commentService
					.queryComment(getTid(), start, limit);// commentService.showAll(hql,
															// start, limit);
			for (Object obj : commentList) {
				Comment c = (Comment) obj;
				Element ele = root.addElement("comment");
				generateXml(ele, c);
			}
		}
		return new XmlView(doc);
	}

	/**
	 * 生成评论表的xml
	 * @param ele
	 * @param comment
	 */
	public void generateXml(Element ele, Comment comment) {
		ele.addElement("name").addText(comment.getCname());
		ele.addElement("posttime").addText(
				DateUtil.format(comment.getCposttime(), "yyyy-MM-dd"));
		ele.addElement("content").addText(comment.getCcontent());
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public CommentService getCommentService() {
		return commentService;
	}

	public void setCommentService(CommentService commentService) {
		this.commentService = commentService;
	}

	public String getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(String currentUser) {
		this.currentUser = currentUser;
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

}
