package org.zengsource.umllearning.core.dao.orm;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.zengsource.umllearning.core.dao.TaskDao;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

public class HibernateTaskDao extends HibernateDaoTemplate implements TaskDao {

	public HibernateTaskDao() {
		// TODO Auto-generated constructor stub
	}

	public void saveTask(Task task) {
		this.hibernateTemplate.save(task);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return Task.class;
	} 

	public Task queryById(String q) {
		Criterion[] criterion = new Criterion[]{
			Restrictions.eq("id", q)
		};
		return (Task) super.queryUnique(criterion);
	}
	
	public Integer queryByTitle(String title) {
		Criterion[] criterions = new Criterion[]{
			Restrictions.eq("title", title)
		};
		return super.queryCount(criterions);
	}
	
	public void updateTask(Task task) {
		this.hibernateTemplate.update(task);
	}
	
	public void delTask(Task task) {
		this.hibernateTemplate.delete(task);
	}
	/**
	 * @author swyma
	 */
	
	//取得总数
	public Integer getCount(Criterion[] criterions) {
		// TODO Auto-generated method stub
		return super.queryCount(criterions);
	}
	
	//分页显示数据
	public List<?> queryTask(Criterion[] criterions, int start, int limit) {
		// TODO Auto-generated method stub
		//super.query(criteriaMap, start, limit);
		return super.query(criterions, start, limit);
		
	}

	public Long getCount(String hql) {
		// TODO Auto-generated method stub
		return (Long)super.getSessionFactory().openSession().createQuery(hql).uniqueResult();
	}

	public List<?> queryTask(String hql, int start, int limit) {
		// TODO Auto-generated method stub
		return super.getSessionFactory().openSession().createQuery(hql).setFirstResult(start).setMaxResults(limit).list();
	}

	public List<?> query(String hql) {
		// TODO Auto-generated method stub
		return super.getSessionFactory().openSession().createQuery(hql).list();
		
	}

	public List<?> querySql(String sql) {
		// TODO Auto-generated method stub
		return super.getSessionFactory().openSession().createSQLQuery(sql).list();
	}

	public BigInteger getCountSql(String sql) {
		// TODO Auto-generated method stub
		return (BigInteger) super.getSessionFactory().openSession().createSQLQuery(sql).uniqueResult();
	}



}
