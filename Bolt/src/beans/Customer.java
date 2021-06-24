package beans;

public class Customer {
	private User user;
	private CustomerType type;
	private int points;
	
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer(User user, CustomerType type, int points) {
		super();
		this.user = user;
		this.type = type;
		this.points = points;
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public CustomerType getType() {
		return type;
	}
	public void setType(CustomerType type) {
		this.type = type;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	@Override
	public String toString() {
		return user.getUsername() + "," + type.getType() + "," + points;
	}
	
}
