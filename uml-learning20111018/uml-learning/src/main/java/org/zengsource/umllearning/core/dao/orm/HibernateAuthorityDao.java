package org.zengsource.umllearning.core.dao.orm;

import org.zengsource.umllearning.core.dao.AuthorityDao;
import org.zengsource.umllearning.core.model.Authority;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

public class HibernateAuthorityDao extends HibernateDaoTemplate implements AuthorityDao{

	public void save(Authority auth) {
		this.hibernateTemplate.save(auth);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return Authority.class;
	}

}
