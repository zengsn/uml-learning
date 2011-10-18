package org.zengsource.umllearning.core.dao.orm;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.zengsource.umllearning.core.dao.RegisterDao;
import org.zengsource.umllearning.core.model.Register;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

public class HibernateRegisterDao extends HibernateDaoTemplate implements RegisterDao {

	public void save(Register register) {
		this.hibernateTemplate.save(register);
	}

	@Override
	public Class<?> getPrototypeClass() {
		return Register.class;
	}

	public Object queryByName(String name) {
		Criterion[] criterions = new Criterion[]{
				Restrictions.eq("username_", name)
		};
		return super.queryUnique(criterions);
	}

	public void update(Register register) {
		this.hibernateTemplate.update(register);
	}

	public List<?> queryAllUsers(String sql, int start, int limit) {
		return (List<?>) this.hibernateTemplate.getSessionFactory().openSession().createSQLQuery(sql).setFirstResult(start).setMaxResults(limit).list();
	}

	public BigInteger count(String sql) {
		return (BigInteger) this.hibernateTemplate.getSessionFactory().openSession().createSQLQuery(sql).uniqueResult();
	}

	
	
}
