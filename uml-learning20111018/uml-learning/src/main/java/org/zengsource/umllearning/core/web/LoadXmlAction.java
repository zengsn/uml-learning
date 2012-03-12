package org.zengsource.umllearning.core.web;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.tomcat.jni.FileInfo;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipartAction;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;
import org.zengsource.mvc.view.HtmlView;
import org.zengsource.mvc.view.XmlView;
import org.zengsource.umllearning.core.model.Task;
import org.zengsource.umllearning.core.service.TaskService;
import org.zengsource.util.IDUtil;
import org.zengsource.util.StringUtil;

public class LoadXmlAction extends MultipleAction {

	/**
	 * @author 
	 */
	private static final long serialVersionUID = 1L;

	//private TaskService taskService;
	private String filename;
	private String filepath;
//	private Map<String, FileItem> fileMap;	
	public LoadXmlAction() {

	}

	/**
	 * @return 
	 * 
	 */
	@Override
	protected AbstractView doService() throws MvcException {
			
	        //this.getResponse().setContentType("text/html");
	       // this.getResponse().setContentType("text/html; charset=UTF-8");
	        
			//String filename = this.getRequest().getParameter("filename");
			//String fileurl = this.getResponse().getparameter("fileurl");
			//fileurl = toolkit.getwebpath()+"/"+fileurl; // toolkit.getwebpath() 站点的目录
			if (!(new File(filepath)).exists()) {    
                System.out.println("没有文件");    
                return new HtmlView("{success: true,msg: '没有此文件'}");
            }else{
            	try{
            		File file=new File(filepath);
    				FileInputStream fis = new FileInputStream(file);
    				this.getResponse().reset();
    				
    				//this.getResponse().setCharacterEncoding("gb2312");
    				//this.getResponse().setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(filename, "gb2312"));
    				this.getResponse().setContentType("application/octet-stream;charset=gb2312");
//    				this.getResponse().setContentType("text/xml;charset=gb2312");
    				this.getResponse().setHeader("Content-Disposition", "attachment;filename=" + this.filename);
//    				this.getResponse().setHeader("Content-Disposition", "attachment;filename=\"" + new String(filename.getBytes())+ "\"");
    				this.getResponse().setHeader("Content-Length", "" + file.length());
//					this.getResponse().setStatus(HttpServletResponse.SC_OK);
////    				this.getResponse().flushBuffer();
    				ServletOutputStream outstream = this.getResponse().getOutputStream();
    				BufferedInputStream bis = new BufferedInputStream(fis);
    				BufferedOutputStream bos = new BufferedOutputStream(outstream);
    				
    				 int readLine = 0;
    				    readLine = bis.read();
    				    while (readLine != -1) {
    				      bos.write(readLine);
    				      readLine = bis.read();
    				    }
    				    bos.flush();
    				    bos.close();
    				    bis.close(); 
    				
    				/*byte[] buff = new byte[4096];
    				int bytesRead;
    				while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
    					bos.write(buff, 0, bytesRead);
    				}
    				
    				/*
    				byte buffer [] = new byte[4096];
    				int len = 0;
    				while((len = fis.read(buffer,0,4096))>-1){
    				outstream.write(buffer,0,len);
    				}
    				outstream.flush();
    				outstream.close();
    				fis.close();*/
    				
    			/*	bos.flush();
    				bos.close();
    				bis.close();*/
    			}catch(Exception ex){
    				ex.printStackTrace();
    			}
            }

			// String fileName = this.getRequest().getParameter("filename");
//	        this.getResponse().setContentType("application/xml;charset=utf-8") ;
//	        //this.getResponse().addHeader("Content-Disposition","attachment; filename=aaa.xml"); 
//	        this.getResponse().reset();//清除缓冲中的数据
//				this.getResponse().setHeader("content-disposition", "attachment;filename="+URLEncoder.encode(filename, "utf-8"));
//			
//				this.getResponse().flushBuffer();
	       // this.setF(fileName);
		   return (AbstractView) this.getResponse(); //new HtmlView("{success:true, msg: 'XML导出成功',data:'"+filename+"'}");
	} 
	
//	public Map<String, FileItem> getFileMap() {
//		return fileMap;
//	}
//
//	public void setFileMap(Map<String, FileItem> fileMap) {
//		this.fileMap = fileMap;
//	}
	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}
}
