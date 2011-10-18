/**
 * 
 */
package org.zengsource.umllearning.core.service;

import java.util.List;

import org.zengsource.umllearning.core.model.Comment;

/**
 * @author hzucmj
 *
 */
public interface CommentService {

	public void insertComment(Comment c);
	
	public List<Comment> showAll(String hql, int start, int limit);
	
	public Long queryCount(String hql);
	
	public List<?> queryComment(String q, int start, int limit);
}
