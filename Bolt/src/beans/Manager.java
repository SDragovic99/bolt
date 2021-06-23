package beans;

public class Manager {
	private String username;
	private int restaurantId;
	
	public Manager() {
		super();
	}

	public Manager(String username, int restaurantId) {
		super();
		this.username = username;
		this.restaurantId = restaurantId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	@Override
	public String toString() {
		return username + "," + restaurantId;
	}
	
}
