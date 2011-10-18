/**
 * 
 */
package org.zengsource.umllearning.core.dao;

import java.util.List;

import org.zengsource.umllearning.core.model.Comment;

/**
 * @author hzucmj
 *
 */
public interface CommentDao {

	public void addComment(Comment c);
	
	public List<Comment> queryAll(String hql, int start, int limit);
	
	public Long queryCount(String hql);
	
	public List<?> queryComment(String q, int start, int limit);
}
