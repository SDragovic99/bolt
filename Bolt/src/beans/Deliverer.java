package beans;

import java.util.List;

public class Deliverer {
	private String username;
	private List<String> orders;
	
	public Deliverer() {
		super();
	}

	public Deliverer(String username, List<String> orders) {
		super();
		this.username = username;
		this.orders = orders;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getOrders() {
		return orders;
	}

	public void setOrders(List<String> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return username + "," + String.join(";", orders);
	}
	
	
}
