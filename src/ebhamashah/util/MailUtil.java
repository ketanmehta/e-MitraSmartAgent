package ebhamashah.util;

import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailUtil {
	private static String USER_NAME = "ketanmehtamadhapar";
	private static String PASSWORD = "Sarvoday2@";
	private static String RECIPIENT = "dvinodhkumar12@gmail.com";
	private static String HEADER_IMAGE = "https://lh3.googleusercontent.com/3f77ww6Xziw9mtqtsbVX1Clpsot82-rKIuLbDfrk9PDSw09-0PIjJhYR9fVnhX0AiSbpSJpuyV5MOcjjQc8G5J1Z3qecyzXFbmOv_u6kaTmHFlLuX3JdUJLmpRith0fow93Pa5rXpsP2E9i9D_IrnXKW6WKQhnUJS-2lLEhjdkvgclyocBo_ZuC8wBmY9JkGgDKHnTOG7h8puGrU9iyDPUTQvw_KnOAgNyxWwy9NiwsNXJLMGrYUo7c4imS493RPkcL6DtbqM_qHpXwlGF-qKl4PxRmHvNIdleA8GKcz1m6WLceTR3Go0TC1jtmqkF7s-td-mKKBcUiXcl78JP7_wUq73iJbdamHSCB2SKUxXfaxGXtvtjiUWkWIzc1S4BooEVOnHau8dW6xZpKJzq37KO2jZSdZSB5YtfVhWRI_i2u7-DihmVb7BXLglSqdoOGGiHQTg5RbEx9P-yepor-sfId8dg_3n9c3eeGZObtLhYyIf7eGWi3Nxy7rKHi51s-S8xgFxPjGYF82Z0A8voLwCZRq8_SWggCpyqUcnful1PPtdAkWQfKqHopnPClSxzB0JoqpCfQZAIbD9REDI_uzwPt6hlPDnfHVhgnVb67i4Q0=w200-h52-no";
	private static String imagesArray[] =
		{
				"https://lh3.googleusercontent.com/Sf4Px9pVTdLgh1v-r7nFA0YkuHD7AfZAs1etWUxSynzyQaNcqJsIKQYfWP4aZTgDO7StNJZdXzmvgFGCwJ-o4EwlLoD9jh0MvdXZBe47r1R6voADNat4Xf3NukYR4ARTi17LHbXVIQZoplip16o_GpgmwEXr4_3f6x1mb-e0BWI0v-CEAk9o19tFgn8NMp-7Fw0PPJBgjIkIT39UELmDizy36uVI2mww4VSTC6zx-BgccqXWPjg7Amk8AdEyHQEOyaL3AOmocQgwNgH1foEVCOdR7KmpD_OfAWbPfGJc9Xid-P3W9Eo5jB6JORz81JIc42TnkgIF_Xu5J315LaXdSNQVMGBqNdCiIsQ22pqa6mo9YopyrDQ-6IPYlDuygnaMlduYqe1TdR-yoEM7ThbDa_xA6L3Z-oRdm0DT1WYMnzjbSVAB7qJMLAGraBwIL4rJnw-3aaLy1I5pnY8EEHuZXrCi1vqnCDyhMabrrrKrRgAkTX3IKr8RUjZyTkO27prp5NLhHgvuxacx5ln3zBhgPa5QyroI3nCR8bQZ9paFWd684OxduKJkjyJZ_grnGGNlCYn89FnO1t4nDuuvGz_dZ4Vs48E32FVRMOBg2ebTYbEbcNOWPCwfoD8EmB3oaNsKJahBXmwv3XwLgY3AeFUOgi6DuTb5q9JKdK2E=w757-h637-no",
				"https://lh3.googleusercontent.com/LMcVFQJ1lQMW_ZLZyZHYQ-bfqcOmAYqDQO0qgJCxPypWswmX1D49zA5IQ5mXPG6WHEdj51RBvkFp3-kYNgYNc50vi1ua5mzQohj0hBr9_VD6buydUjDMmg0pcADkHfHgaf25bsvhGdHhBvTf9lA4k6AwTANIKNyn7Lm0hw56Ck5BAmVx8SD0kpsOZVDYTv636V3_xBEzzizyK8-stCm-tnHAEJczB46kU23WT13AtIyxVlJTXCMSsGjJ4pY2egiCVXZA78Hzk3jLYBW3OxDrwRPJfGsSWoQzeLpqx3UMCsjNJm4NoNDo_cPfg3qmHK_K0b2d_TwOZGYc733dQFAjX10PpuWKCO5pM0vZwUhK_ZxkGMKHZaSRoCj7cHa9_1l5yB7ow5Zl65M33FNVaN-YgATZxMibb1rq1InyhOQ27nX8xBxBtkw-jxypqnRGwPoD32ZZjLk3hGjFJGxdeAjS_dEgymFEeRJ7gXy1dfOm3PCLsae2r7Q9yFiW8HFMSG0lT2ercU-u2_loPSVZCxTDwcpIzwe0DnnqKsp_KbBQ7B4cB5sKfW8E6RHqbBn7JN8XAoLTHNYYIGYqXcreYmuz6vzX4USv3DsL56VzGgJdMjU=s637-no",
				"https://lh3.googleusercontent.com/pbSu3F-vZXneKplNTRmB2Dnb_3mPQ2HtSLM1bpnWZjuKgwJjYF8jg4ldK8994yu1474NI5xCF6Z16jZATIe7b3hYo2LLr0v74CMPGKMJITbibjIyuS7w4Ez8-Psbq5rucPlTYp8utxJXWgA3Sv4QvXoX2W5y-Xu09V5iyH5Gk_tuYzS44kO4S9qMsdhPvmLGT7VIludZ7wF4BZqxnNKa29vJIbW6CBiEUyxjLsbLX5VhdlsYYu6DpSdUq9R8gNgE-hGK8IcMn7qjgBuUXlcwuMcyc1KrAqhOj_ul1UosZ-jFMTQ6ybapMZbdC-ulWOXObn-B0sVBEJ4rjuCHay1UDMGd3gtcLMV65_b4JnZX_JvGH7xUTZRkfODg2M4Qigoyh_0dZpCOuakDmNEl1atOflaekKHyG_H5AFssdvx4Rcbr19rFQ7yagFtxfpph_kxsRPZPAKqpi_5FlSqMIRj99IRk14dO-sOh_IuVgbh5eGWQsut-WKvRP0Pdx2YCUpqApnnPqiw-Vw8pI-66FaAvm1lflHNrIN4PzjWtvTXvGttuCtlcPMYd2-EqwBeCq9DABM2iMv8Xnf2g4vaD6yCVwuXLtoPooReQ5PMIhrXRBYs=s637-no",
				"https://lh3.googleusercontent.com/XYAJV4GbR5s0cmqefH-9EsBnStR0Xwr8VLTbKU79oswllsrw6fDUhPha4x3G-MaVbp1YDatpyQIr-UAsgvx_z2qEUFK7I50EOSUignYBTatLV-g8-LD1ipPfOwBxLVYVfYwkuhK2pAORbNxWdTpmn6nRAgKNfsVZj0rIrp6QFZTWs4bYjjUSgrWNjh2ulaNql3qp8B6IMngQm6uaqaEMFr_4WbWNJ05JD22rktKQMxj2nauCXhN3dCnuRK8AfrCRKc9oKeNdbluIq-T6MsjR-omgl9iIGd_KGxKslmMQKF7n1OBXTjY8jLHIku_3YMhRDw1Nej1YfLuyqbJ9gZ23ArAhMibiD2PYwAOJm3OedT1Np1Ncq4BipZcBSyf411WXYliS-yyQcFdXN92yrzUTIJSjhzsVMLUejEF-64zdr-xx3I7PVorZCug4MCuf0mQAuUuvMyvQ7Sy5689hgOlZpBqaW5E3F43agdGDddKMoSiI3SI_EEJ7apx_iMLmCxM3UMmd1UkCCfDZy0kpMP2y69nWX4Qz9mZIda5Yc71Gss-RmDmfoDodUktQkc5vqy68JCdK9YLs4tZ4dKj00P5nIhY8SLUZ6KJjDanFF6BmvvU=w986-h396-no"
		};

	public static void sendMail(String recipientMail, String subject, String bodyContent) {
		String from = USER_NAME;
		String pass = PASSWORD;
		String[] to = { RECIPIENT, recipientMail };
		sendFromGMail(from, pass, to, subject, bodyContent);
	}

	private static void sendFromGMail(String from, String pass, String[] to, String subject, String body) {
		Properties props = System.getProperties();
		String host = "smtp.gmail.com";
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.user", from);
		props.put("mail.smtp.password", pass);
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.auth", "true");

		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);

		try {
			message.setFrom(new InternetAddress(from));
			InternetAddress[] toAddress = new InternetAddress[to.length];

			// To get the array of addresses
			for (int i = 0; i < to.length; i++) {
				toAddress[i] = new InternetAddress(to[i]);
			}

			for (int i = 0; i < toAddress.length; i++) {
				message.addRecipient(Message.RecipientType.TO, toAddress[i]);
			}
			
			message.setSubject(subject);
			message.setText(getInitialMessage() + body + getFooterMessage(), "utf-8", "html");
			Transport transport = session.getTransport("smtp");
			transport.connect(host, from, pass);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (AddressException ae) {
			ae.printStackTrace();
		} catch (MessagingException me) {
			me.printStackTrace();
		}
	}
	public static String getInitialMessage() {
		StringBuilder sb = new StringBuilder();
		sb.append("<img src=\"" + HEADER_IMAGE + "\"></img><hr /><br/>");
		sb.append("<b>Dear Customer, <br />")
		.append("Please find the below transcript as requested. <br/><br/></b>");
		return sb.toString();
	}
	public static String getFooterMessage() {
		StringBuilder sb = new StringBuilder();
		Random r = new Random();
		sb.append("<br /><br /><hr />")
		.append("<img src=\"" + imagesArray[r.nextInt(4)] + "\"></img><hr />");
		return sb.toString();
	}
}
