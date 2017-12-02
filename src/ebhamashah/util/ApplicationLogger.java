package ebhamashah.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ApplicationLogger {

	private static final boolean instrument = false;
	private final Logger logger;

	public static ApplicationLogger getLogger(final Class<?> clazz) {
		return new ApplicationLogger(clazz);
	}

	private ApplicationLogger(final Class<?> class1) {
		this.logger = LoggerFactory.getLogger(class1);
	}

	public void debug(final String debugMsg) {
		this.logger.debug(debugMsg);
	}

	public void error(final String errorMsg) {
		if (this.logger.isErrorEnabled()) {
			this.logger.error(errorMsg);
		}
	}

	public void error(final Throwable exceptionObj) {
		if (this.logger.isErrorEnabled()) {
			this.logger.error(exceptionObj.getMessage(), exceptionObj);
		}
	}

	private static java.lang.StackTraceElement[] getCurrentThreadStackTrace() {
		return java.lang.Thread.currentThread().getStackTrace();
	}

	public Long startMethodInstrument() {
		Long methodStart = 0l;

		if (instrument) {
			methodStart = System.currentTimeMillis();
		}
		return methodStart;
	}

	public void endMethodInstrument(final Long methodStart) {
		Long timeTakenByMethod = null;

		if (instrument) {
			final Long currentInstant = System.currentTimeMillis();
			timeTakenByMethod = currentInstant - methodStart;
			final java.lang.StackTraceElement[] array = ApplicationLogger.getCurrentThreadStackTrace();
			final java.lang.String className = array[3].getClassName();
			final java.lang.String methodName = array[3].getMethodName();

			this.logger.error(
					"TIME TAKEN BY METHOD " + className + "." + methodName + " : (" + timeTakenByMethod + ") ms");
		}
	}

	public Boolean isDebugEnabled() {
		return this.logger.isDebugEnabled();
	}

	public Boolean isErrorEnabled() {
		return this.logger.isErrorEnabled();
	}

	public void info(final java.lang.String message) {
		this.logger.info(message);
	}

}
