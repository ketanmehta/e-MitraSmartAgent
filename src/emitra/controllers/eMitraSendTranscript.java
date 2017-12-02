package emitra.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import emitra.util.GsonUtil;
import emitra.util.MailUtil;

@WebServlet(urlPatterns = { "/eMitraSendTranscript" })
public class eMitraSendTranscript extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static String subject = "Transcript Log with eMitra Agent";

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		MailUtil.sendMail(request.getParameter("recipientMail"), subject, request.getParameter("bodyContent"));
		GsonUtil.generateSuccessResponse(new Object(), response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
}
