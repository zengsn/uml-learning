/**
 * 
 */
package org.zengsource.umllearning.core.dao.orm;

import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.zengsource.umllearning.core.dao.WebtopDao;
import org.zengsource.umllearning.core.model.Webtop;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;


public class HibernateWebtopDao extends HibernateDaoTemplate implements WebtopDao {

	@Override
	public Class<?> getPrototypeClass() {
		return Webtop.class;
	}

	public boolean saveConfig(Webtop webware) {
		this.hibernateTemplate.save(webware);
		return true;
	}

	public List<?> readRoleConfig(String role, int start, int limit) {
		Criterion[] criterions = new Criterion[]{
			Restrictions.eq("wid_", role)
		};
		return super.query(criterions, start, limit);
	}

	public Object queryByWid(String wid) {
		return super.getSessionFactory().openSession().createQuery(wid);
	}

	public List<?> query(String wid) {
		return super.getSessionFactory().openSession().createQuery(wid).list();
	}

	public void updateConfig(Object object) {
		super.hibernateTemplate.update(object);
	}

}
