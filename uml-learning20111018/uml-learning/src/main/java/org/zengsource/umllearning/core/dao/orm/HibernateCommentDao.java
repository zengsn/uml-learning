/**
 * 
 */
package org.zengsource.umllearning.core.dao.orm;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.zengsource.umllearning.core.dao.CommentDao;
import org.zengsource.umllearning.core.model.Comment;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

/**
 * @author hzucmj
 *
 */
public class HibernateCommentDao extends HibernateDaoTemplate implements CommentDao {

	/**
	 * 
	 */
	public HibernateCommentDao() {
		// TODO Auto-generated constructor stub
	}

	public void addComment(Comment c) {
		// TODO Auto-generated method stub
		this.hibernateTemplate.save(c);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return Comment.class;
	}

	@SuppressWarnings("unchecked")
	public List<Comment> queryAll(String hql, int start, int limit) {
		// TODO Auto-generated method stub
		Session session = this.hibernateTemplate.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			Query query = session.createQuery(hql).setFirstResult(start).setMaxResults(limit);
			session.getTransaction().commit();
			return query.list();
		} catch (Exception e){
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	public Long queryCount(String hql) {
		Session session = this.hibernateTemplate.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			Query query = session.createQuery(hql);
			session.getTransaction().commit();
			return (Long) query.uniqueResult();
		} catch (Exception e ){
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}

	public List<?> queryComment(String q, int start, int limit) {
		Criterion[] criterions = new Criterion[]{
			Restrictions.eq("tid", q)
		};
		return super.query(criterions, start, limit);
	}

	
}
