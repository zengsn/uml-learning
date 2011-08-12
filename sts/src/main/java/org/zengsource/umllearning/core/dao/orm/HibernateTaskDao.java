package org.zengsource.umllearning.core.dao.orm;

import org.zengsource.umllearning.core.dao.TaskDao;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

public class HibernateTaskDao extends HibernateDaoTemplate implements TaskDao{

	public HibernateTaskDao(){
		// TODO Auto-generated constructor stub
	}
	
	public Task queryById(String id) {
		return (Task)super.queryById(id);
	}

	public void saveTask(Task task) {
		super.save(task);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return null;
	}

}
