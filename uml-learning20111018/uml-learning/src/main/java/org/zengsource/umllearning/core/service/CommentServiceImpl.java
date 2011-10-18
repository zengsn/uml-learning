/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.util.List;

import org.zengsource.umllearning.core.dao.CommentDao;
import org.zengsource.umllearning.core.model.Comment;

/**
 * @author hzucmj
 *
 */
public class CommentServiceImpl implements CommentService{

	CommentDao commentDao;
	
	/**
	 * 构造函数
	 */
	public CommentServiceImpl() {
		super();
	}

	public void insertComment(Comment c) {
		commentDao.addComment(c);
	}

	public CommentDao getCommentDao() {
		return commentDao;
	}

	public void setCommentDao(CommentDao commentDao) {
		this.commentDao = commentDao;
	}

	public List<Comment> showAll(String hql, int start, int limit) {
		return this.commentDao.queryAll(hql, start, limit);
	}
	/**
	 * 获取评论数量
	 */
	public Long queryCount(String hql) {
		return this.commentDao.queryCount(hql);
	}

	/**
	 * 查询评论
	 */
	public List<?> queryComment(String q, int start, int limit) {
		return this.commentDao.queryComment(q, start, limit);
	}


}
