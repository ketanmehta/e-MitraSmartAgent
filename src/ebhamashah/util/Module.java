package ebhamashah.util;

public enum Module {
	
	DATABASE_MODULE("DATABASE_MODULE"),
	DONOR_MODULE("DONOR_MODULE"),
	VOLUNTEER_MODULE("VOLUNTEER_MODULE");
	
	private String name;

	Module(String name)
	{
		this.name = name;
	}

	public String getName() {
		return this.name;
	}
}
