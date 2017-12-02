package emitra.bean;

import java.io.Serializable;

public class DataHolder implements Serializable{

	private static final long serialVersionUID = 1L;
	private boolean success;
	private Object data;

	public DataHolder(final boolean success, final Object data)
	{
		this.success = success;
		this.data = data;
	}

	public Object getData()
	{
		return this.data;
	}

	public boolean isSuccess()
	{
		return this.success;
	}

	public void setData(final String data)
	{
		this.data = data;
	}

	public void setSuccess(final boolean success)
	{
		this.success = success;
	}

}
