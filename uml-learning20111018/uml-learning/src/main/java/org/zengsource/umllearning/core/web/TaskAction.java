package org.zengsource.umllearning.core.web;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.mvc.view.XmlView;
import org.zengsource.umllearning.core.model.Homework;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.HomeworkService;
import org.zengsource.umllearning.core.service.TaskService;
import org.zengsource.util.DateUtil;

public class TaskAction extends MultipleAction {

	/**
	 *
	 */

	private static final long serialVersionUID = 1L;

	private TaskService taskService;
	private HomeworkService homeworkService;

	private String t_id;
	private String t_author;
	private String t_type;
	private String t_subject;
	private String t_title;
	private String t_pic;
	private String t_content;
	private String t_finishtime;

	private String t_score;

	private String start;
	private String limit;
	// swyma
	private String data;
	private String type;

	private String taskId;

	private String umlString;
	private String currentUser;

	public TaskAction() {
		// TODO Auto-generated constructor stub

	}

	/**
	 * 读取一条作业或者问题的数据
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doReadTask() throws MvcException {
		System.out.println("TaskId : " + this.getTaskId());
		String tid = this.getTaskId();
		Task t = this.taskService.findById(tid);
		// Task t = this.taskService.findById("20110826161636384");
		if (t != null) {
			String pt = null, ft = null;
			pt = new SimpleDateFormat("yyyy-MM-dd").format(t.getPosttime());
			if (t.getFinishtime() != null) {
				ft = new SimpleDateFormat("yyyy-MM-dd").format(t
						.getFinishtime());
			} else {
				ft = "";
			}
			System.out.println(pt);
			System.out.println(ft);
			return new HtmlView("{success:true, data:{bro_id :'" + t.getId()
					+ "', bro_title : '" + t.getTitle() + "', bro_author : '"
					+ t.getAuthor() + "', bro_subject : '" + t.getSubject()
					+ "', bro_content : '" + t.getContent()
					+ "', bro_posttime : '" + pt + "', bro_finishtime : '" + ft
					+ "', bro_pic : '" + t.getPic() + "'}}");
		} else {
			return new HtmlView("{failure : true, msg : '数据加载失败！'}");
		}
	}

	/**
	 * 更新作业数据信息（教师修改作业）
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doUpdateTask() throws MvcException {

		String id = this.getT_id();
		String score = this.getT_score();
		String content = this.getT_content();
		System.out.println(id);
		Homework h = this.homeworkService.findById(id);
		if (h != null) {
			System.out.println(h.getCsName());
			h.setCsScore(score);
			h.setCsFlag(true);
			this.homeworkService.saveHomework(h);
			Task t = taskService.findById(id);
			if (t != null) {
				t.setContent(content);
				taskService.updateTask(t);
			}
			return new HtmlView("{success : true, msg : '提交成功！'}");
		}
		return new HtmlView("{failure : true, msg : '提交失败！'}");
	}

	/**
	 * 显示所有作业
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doShowTask() throws MvcException {
		// TODO Auto-generated method stub
		List<?> tasks = null;
		Integer count = 0;
		currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
		Criterion[] criterions = new Criterion[] { Restrictions.eq("type",
				"task")};
		count = taskService.getCount(criterions);
		tasks = taskService.query(criterions, new Integer(start), new Integer(
				limit));
		if(tasks.size()>0){
			// 创建xml文件
			Document doc = DocumentHelper.createDocument();
			Element root = doc.addElement("tasks");
			for (int i = 0; i < tasks.size(); i++) {
				Task task = (Task) tasks.get(i);
				Element taskEle = root.addElement("task");
				taskEle.addElement("total").addText(count + "");
				taskEle.addElement("tid").addText(task.getId());
				taskEle.addElement("tauthor").addText(task.getAuthor());
				taskEle.addElement("tsubject").addText(task.getSubject());
				taskEle.addElement("ttype").addText(task.getType());
				taskEle.addElement("ttitle").addText(task.getTitle());
				taskEle.addElement("tcontent").addText(htmlToText(task.getContent()));
				if (task.getPic() != null) {
					if (task.getPic().startsWith("img")) {
						taskEle.addElement("tpic").addText(task.getPic());
					} else {
						taskEle.addElement("tpic").addText("no-image.gif");
					}
				} else {
					taskEle.addElement("tpic").addText("no-image.gif");
				}
				if (task.getPosttime() != null) {
					taskEle.addElement("tpost").addText(DateUtil.format(task.getPosttime(), "yyyy-MM-dd"));
				}
				if (task.getFinishtime() != null) {
					taskEle.addElement("tfinish").addText("完成时间：" + DateUtil.format(task.getFinishtime(),"yyyy-MM-dd"));
				}
			}
			return new XmlView(doc);
		}else{
			return new XmlView("");
		}
	}

	/**
	 * 显示所有问题
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doShowQuestion() throws MvcException {
		// TODO Auto-generated method stub
		List<?> tasks = null;
		Integer count = 0;
		Criterion[] criterions = new Criterion[] { Restrictions.eq("type",
				"question") };
		count = taskService.getCount(criterions);
		tasks = taskService.query(criterions, new Integer(start), new Integer(
				limit));
		if(tasks.size()>0){
			Document doc = DocumentHelper.createDocument();
			Element root = doc.addElement("tasks");
			for (int i = 0; i < tasks.size(); i++) {
				Task task = (Task) tasks.get(i);
				Element taskEle = root.addElement("task");
				taskEle.addElement("total").addText(count + "");
				taskEle.addElement("tid").addText(task.getId());
				taskEle.addElement("tauthor").addText(task.getAuthor());
				taskEle.addElement("tsubject").addText(task.getSubject());
				taskEle.addElement("ttype").addText(task.getType());
				taskEle.addElement("ttitle").addText(task.getTitle());
				taskEle.addElement("tcontent").addText(htmlToText(task.getContent()));
				if (task.getPic() != null) {
					if (task.getPic().startsWith("img")) {
						taskEle.addElement("tpic").addText(task.getPic());
					} else {
						taskEle.addElement("tpic").addText("no-image.gif");
					}
				} else {
					taskEle.addElement("tpic").addText("no-image.gif");
				}
				if (task.getPosttime() != null) {
					taskEle.addElement("tpost").addText(DateUtil.format(task.getPosttime(), "yyyy-MM-dd"));
				}
				if (task.getFinishtime() != null) {
					taskEle.addElement("tfinish").addText("完成时间：" + DateUtil.format(task.getFinishtime(),"yyyy-MM-dd"));
				}
			}
			return new XmlView(doc);
		}else{
			return new XmlView("");
		}
	}

	public AbstractView doDelTask() throws MvcException {
		String id = this.getT_id();
		if (id != null) {
			Task task = this.taskService.findById(id);
			if (task != null) {
				this.taskService.delTask(task);
				String msg = "删除成功！";
				return new HtmlView(msg);
			}
		}
		return null;
	}

	/**
	 * 显示学生已完成作业
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doShowHomework() throws MvcException {
		// TODO Auto-generated method stub
		List<?> tasks = null;
		Integer count = 0;
		Criterion[] criterions = new Criterion[] { Restrictions.eq("type",
				"homework") };
		count = taskService.getCount(criterions);
		tasks = taskService.query(criterions, new Integer(start), new Integer(
				limit));
		if(tasks.size()>0){
			
			Document doc = DocumentHelper.createDocument();
			Element root = doc.addElement("tasks");
			for (int i = 0; i < tasks.size(); i++) {
				Task task = (Task) tasks.get(i);
				Element taskEle = root.addElement("task");
				taskEle.addElement("total").addText(count + "");
				taskEle.addElement("tid").addText(task.getId());
				taskEle.addElement("tauthor").addText(task.getAuthor());
				taskEle.addElement("tsubject").addText(task.getSubject());
				taskEle.addElement("ttype").addText(task.getType());
				taskEle.addElement("ttitle").addText(task.getTitle());
				taskEle.addElement("tcontent").addText(htmlToText(task.getContent()));
				if (task.getPic() != null) {
					if (task.getPic().startsWith("img")) {
						taskEle.addElement("tpic").addText(task.getPic());
					} else {
						taskEle.addElement("tpic").addText("no-image.gif");
					}
				} else {
					taskEle.addElement("tpic").addText("no-image.gif");
				}
				if (task.getPosttime() != null) {
					taskEle.addElement("tpost").addText(DateUtil.format(task.getPosttime(), "yyyy-MM-dd"));
				}
				if (task.getFinishtime() != null) {
					taskEle.addElement("tfinish").addText("完成时间：" + DateUtil.format(task.getFinishtime(),"yyyy-MM-dd"));
				}
			}
			return new XmlView(doc);
		}else{
			return new XmlView("");
		}
	}

	/**
	 * 动态生成作业信息树
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doCheckTree() throws MvcException {
		String hql = "select task.title,task.id from Task task where task.type='task'";
		List<?> treelist = taskService.query(hql);
		// List treelist=taskService.query(hql);
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		for (int i = 0; i < treelist.size(); i++) {
			// Task task=(Task)treelist.get(i);
			Object[] object = (Object[]) treelist.get(i);
			// System.out.println("----------------------"+object[0].toString()+"---------"+object[1].toString());
			sb.append("{\"id\":\"").append(object[1].toString())
					.append("\",\"text\":\"").append(object[0].toString())
					.append("\",\"leaf\":true").append("},");
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		System.out.println(sb.toString());
		return new HtmlView(sb.toString());
	}

	/**
	 * 返回某作业的学生完成情况
	 * 
	 * @return
	 * @throws MvcException
	 */
	public AbstractView doCheckGrid() throws MvcException {
		String id = getData();
		if (!(id == null)) {
			if (!id.equals("tree")) {
				String countsql = "select count(t.t_id) from tb_task t,tb_completestatus cs where t.t_id ='"
						+ id + "' and cs.t_id='" + id + "'";
				BigInteger count = taskService.getCountSql(countsql);
				String allinfo = "select t.t_id as id, t.t_title as title, t.t_content as content, t.t_posttime as posttime,cs.cs_name as name,cs.cs_homeworkid as homeworkid,"
						+ "cs.cs_score,cs.cs_flag from tb_task t,tb_completestatus cs where t.t_id ='"
						+ id + "' and cs.t_id='" + id + "'";
				List<?> list = taskService.querySql(allinfo);

				if (list.size() > 0) {
					StringBuffer sb = new StringBuffer();
					sb.append("{success:true,\"total\":").append(count)
							.append(",\"root\":[");
					for (int i = 0; i < list.size(); i++) {
						Object[] object = (Object[]) list.get(i);
						sb.append("{\"id\":\"").append(object[5])
								.append("\",\"name\":\"").append(object[4])
								.append("\",\"score\":\"").append(object[6])
								.append("\",\"detail\":\"");
						sb.append(htmlToText(object[2].toString()))
								.append("\",\"time\":\"").append(object[3])
								.append("\",\"flag\":\"").append(object[7])
								.append("\"},");
					}
					sb.deleteCharAt(sb.length() - 1);
					sb.append("]}");
					logger.info(sb.toString());
					return new HtmlView(sb.toString());
				} else {
					return new HtmlView("{success:true,total:0,root:[]}");
				}
			} else {
				return new HtmlView("{success:false}");
			}
		} else {
			return new HtmlView("");
		}
	}

	/**
	 * 将html文档转换为文本
	 * 
	 * @param htmlStr
	 * @return string
	 */
	public static String htmlToText(String htmlStr) {
		String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
		String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
		String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

		Pattern p_script = Pattern.compile(regEx_script,
				Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern
				.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	/**
	 * 从前台获取canvas画布所绘制图形的xml代码
	 * 
	 * @return HtmlView
	 */
	public AbstractView doSaveUmlString() {
		String canvasXmlData = this.getUmlString();
		currentUser = SecurityContextHolder.getContext().getAuthentication()
				.getName();
		if (canvasXmlData != null) {
			Cookie canvasXmlCookie = new Cookie("canvasXmlData-" + currentUser,
					canvasXmlData);
			canvasXmlCookie.setMaxAge(60 * 60 * 24);
			canvasXmlCookie.setPath("./");
			this.getResponse().addCookie(canvasXmlCookie);

			Cookie[] cookie = this.getRequest().getCookies();

			if (cookie != null) {
				for (int i = 0; i < cookie.length; i++) {
					if (cookie[i].getName().equals(
							"canvasXmlData-" + currentUser)) {
						String str = cookie[i].getValue();
						System.out.println("xml : " + str);
					}
				}
			}

			return new HtmlView("图片上传成功， 请到相关页面完成作业！");
		}
		return new HtmlView("图片上传失败，请重新上传！");
	}

	/**
	 * 获取xml绘图数据
	 * 
	 * @return
	 */
	public AbstractView doGetXmlString() {
		// 从数据库里取某题的xml数据
		
		String id = this.getRequest().getParameter("id"); 
		Task t = this.taskService.findById(id); 
		String str = t.getPic();
		logger.info("pic info :　" + str);
		
		if(str.startsWith("img")){
			return new HtmlView("");
		}else{
			Document doc;
			StringBuffer sb = new StringBuffer("[");
			try {
				doc = DocumentHelper.parseText(str);
				Element root = doc.getRootElement();
				Iterator<?> subIterator = root.elementIterator();
				while (subIterator.hasNext()) {
					sb.append("{");
					Element subEl = (Element) subIterator.next();
					Iterator<?> it = subEl.elementIterator();
					while (it.hasNext()) {
						Element el = (Element) it.next();
						sb.append(
								"\"" + el.getName() + "\":\"" + el.getText() + "\"")
								.append(",");
					}
					sb.deleteCharAt(sb.length() - 1);
					sb.append("},");
				}
			} catch (DocumentException e) {
				e.printStackTrace();
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			System.out.println(sb.toString());
			return new HtmlView(sb.toString());
		}
	}

	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public String getT_author() {
		return t_author;
	}

	public void setT_author(String t_author) {
		this.t_author = t_author;
	}

	public String getT_type() {
		return t_type;
	}

	public void setT_type(String t_type) {
		this.t_type = t_type;
	}

	public String getT_subject() {
		return t_subject;
	}

	public void setT_subject(String t_subject) {
		this.t_subject = t_subject;
	}

	public String getT_title() {
		return t_title;
	}

	public void setT_title(String t_title) {
		this.t_title = t_title;
	}

	public String getT_pic() {
		return t_pic;
	}

	public void setT_pic(String t_pic) {
		this.t_pic = t_pic;
	}

	public String getT_content() {
		return t_content;
	}

	public void setT_content(String t_content) {
		this.t_content = t_content;
	}

	public void setT_finishtime(String t_finishtime) {
		this.t_finishtime = t_finishtime;
	}

	public String getT_finishtime() {
		return t_finishtime;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getT_score() {
		return t_score;
	}

	public void setT_score(String t_score) {
		this.t_score = t_score;
	}

	public HomeworkService getHomeworkService() {
		return homeworkService;
	}

	public void setHomeworkService(HomeworkService homeworkService) {
		this.homeworkService = homeworkService;
	}

	public String getT_id() {
		return t_id;
	}

	public void setT_id(String t_id) {
		this.t_id = t_id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUmlString() {
		return umlString;
	}

	public void setUmlString(String umlString) {
		this.umlString = umlString;
	}

}
