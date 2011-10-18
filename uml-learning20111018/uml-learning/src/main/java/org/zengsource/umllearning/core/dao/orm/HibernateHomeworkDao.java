/**
 * 
 */
package org.zengsource.umllearning.core.dao.orm;

import org.zengsource.umllearning.core.dao.HomeworkDao;
import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

/**
 * @author hzucmj
 * 
 */
public class HibernateHomeworkDao extends HibernateDaoTemplate implements
		HomeworkDao {

	/**
	 * 
	 */
	public HibernateHomeworkDao() {
		// TODO Auto-generated constructor stub
	}

	public void doTask(Task t, Homework h) {
		// TODO Auto-generated method stub
		this.hibernateTemplate.save(t);
		this.hibernateTemplate.save(h);
	}

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return Homework.class;
	}

	public Homework queryById(String id) {
		return (Homework) super.queryUnique("csId", id);
	}

	public void saveHomework(Homework h) {
//		super.save(h);
//		this.hibernateTemplate.save(h);
		this.hibernateTemplate.update(h);
	}

}
