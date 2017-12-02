package emitra.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import ai.api.AIServiceException;
import ai.api.model.AIResponse;
import ai.api.web.AIServiceServlet;
import emitra.util.ApplicationLogger;
import emitra.util.GsonUtil;

@WebServlet(urlPatterns = { "/eMitraAgent" }, initParams = {
		@WebInitParam(name = eMitraAgentServlet.PARAM_API_AI_KEY, value = "8bf72a1f9d154bdf84ff12c85d35bcf5") })
public class eMitraAgentServlet extends AIServiceServlet {
	private static final long serialVersionUID = 1L;
	private static final ApplicationLogger logger = ApplicationLogger.getLogger(GsonUtil.class);
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			AIResponse aiResponse = request(decrypt(request.getParameter("query")), request.getSession());
			response.setContentType("text/plain");
			//logger.error(GsonUtil.toJson(aiResponse.getResult()));
			Set<String> responseSet = new HashSet<String>();
			responseSet.add("<b>eMitra Agent</b> : " + aiResponse.getResult().getFulfillment().getSpeech());
			String output = StringUtils.join(responseSet, "<br></hr>");
			//logger.error(output);
			response.getWriter().write(encrypt(output));
		} catch (AIServiceException e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
	
	public static String encrypt(String input) {
		List<Integer> list = new ArrayList<Integer>();
		for(char c : input.toCharArray()) {
			list.add((int) c);
		}
		String output = StringUtils.join(list,"#");
		logger.error(" Input : " + input  + " Output :" + output);
		return output;
	}
	
	public static String decrypt(String input) {
		String tokens[] = input.split("#");
		String dec = "";
		for(String s : tokens) {
			dec += (char)(int)Integer.valueOf(s);
		}
		logger.error(" Input : " + input  + " Output :" + dec);
		return dec;
	}

}
