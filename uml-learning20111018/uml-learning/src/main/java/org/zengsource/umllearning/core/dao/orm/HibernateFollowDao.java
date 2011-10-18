package org.zengsource.umllearning.core.dao.orm;

import java.util.List;

import org.zengsource.umllearning.core.dao.FollowDao;
import org.zengsource.umllearning.core.model.Follow;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

/**
 * @author swyma
 */
public class HibernateFollowDao extends HibernateDaoTemplate implements FollowDao {

	public Long getCount(String hql) {
		// TODO Auto-generated method stub
		return (Long)super.getSessionFactory().openSession().createQuery(hql).uniqueResult();
	}

	public List<?> queryFollow(String hql, int start, int limit) {
		// TODO Auto-generated method stub
		return super.getSessionFactory().openSession().createQuery(hql).setFirstResult(start).setMaxResults(limit).list();
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return Follow.class;
	}

	public void save(Follow follow) {
		// TODO Auto-generated method stub
		super.hibernateTemplate.save(follow);
	}

	public void delete(String hql) {
		// TODO Auto-generated method stub
		super.hibernateTemplate.getSessionFactory().openSession().createQuery(hql).executeUpdate();
	}

}
