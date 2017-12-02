package ebhamashah.util;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import ebhamashah.bean.DataHolder;

public class GsonUtil {
	private static Gson _INSTANCE = null;
	private static final ApplicationLogger logger = ApplicationLogger.getLogger(GsonUtil.class);
	static {
		_INSTANCE = new Gson();
	}

	public static void generateSuccessResponse(final Object input, final HttpServletResponse response)
			throws JsonIOException, IOException {
		long t1 = logger.startMethodInstrument();
		try {
			response.setContentType("text/html");
			String content = _INSTANCE.toJson(new DataHolder(true, input));
			response.getWriter().write(content);
		} finally {
			logger.endMethodInstrument(t1);
		}

	}

	public static void generateFailureResponse(final String input, final HttpServletResponse response)
			throws JsonIOException, IOException {
		long t1 = logger.startMethodInstrument();
		try {

			response.setContentType("text/html");
			_INSTANCE.toJson(new DataHolder(false, input), response.getWriter());
		} finally {
			logger.endMethodInstrument(t1);
		}
	}
	
	public static String toJson(final Object input)
			throws JsonIOException, IOException {
		long t1 = logger.startMethodInstrument();
		try {

			return _INSTANCE.toJson(input);
		} finally {
			logger.endMethodInstrument(t1);
		}
	}

}
