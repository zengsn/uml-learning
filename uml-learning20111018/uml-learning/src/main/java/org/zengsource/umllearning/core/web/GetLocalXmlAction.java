package org.zengsource.umllearning.core.web;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.Cookie;

import org.apache.commons.fileupload.FileItem;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipartAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.TaskService;
import org.zengsource.util.IDUtil;
import org.zengsource.util.StringUtil;

public class GetLocalXmlAction extends MultipartAction {

	/**
	 * @author 
	 */
	private static final long serialVersionUID = 1L;

	//private TaskService taskService;
	private String filename;	
	private Map<String, FileItem> fileMap;	
	public GetLocalXmlAction() {

	}

	/**
	 * 
	 */
	@Override
	protected AbstractView doService() throws MvcException {
		
		String uxmlstr="";
		String rootPath = getContext().getRootPath();
		System.out.println("getRootPath :"+rootPath);
		File usrDir = new File(rootPath + "/upload/");
		if (!usrDir.exists() || usrDir.isFile()){
			usrDir.mkdirs();		
		}	
		FileItem picItem = getFileItem("umlxml");
		if (picItem != null) {
			//System.out.println("usrDir :"+usrDir);
			String str = IDUtil.generate("uxml");
			String uploadName = picItem.getName();
			if(!uploadName.substring(uploadName.lastIndexOf(".")).equals(".xml")){
				return new HtmlView("{failure:true, msg: 'XML导入失败'}"); 
			}else{
				filename = str + uploadName.substring(uploadName.lastIndexOf("."));					
				File diskFile = saveFile("umlxml", usrDir + "/" + str);
				if (diskFile != null) {
					filename=filename.toLowerCase();
					System.out.println("filename :"+filename);
				}
				try {
					FileReader fr=new FileReader(diskFile); 
					uxmlstr=readXML(fr);
					System.out.println("uxmlstr------:"+uxmlstr);
					diskFile.delete();
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		
		}
		return new HtmlView("{success:true, msg: 'XML导入成功',data:'" + uxmlstr+ "'}");
	}

	private String readXML(FileReader fr) {
		try {
			BufferedReader bufferedReader = new BufferedReader(fr);
			StringBuilder stringBuilder = new StringBuilder();
			String s;
			while ((s = bufferedReader.readLine()) != null) {
				s=s.trim();
				if(s.matches("</?uml>.*") || s.matches("</?shape>.*") || s.matches("</?el[XYWH].*>.*") || s.matches("</?type>.*")|| !s.startsWith("<")){
					stringBuilder.append(s.trim());					
				}
			}
			s=stringBuilder.toString();
			fr.close(); ///
			Document doc;
			StringBuffer sb = new StringBuffer("[");
			try {
				doc = DocumentHelper.parseText(s);
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
			//System.out.println(sb.toString());
			return sb.toString();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Map<String, FileItem> getFileMap() {
		return fileMap;
	}

	public void setFileMap(Map<String, FileItem> fileMap) {
		this.fileMap = fileMap;
	}
	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}
}
