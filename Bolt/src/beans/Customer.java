package beans;

public class Customer {
	private User user;
	private CustomerType customerType;
	private int points;
	
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer(User user, CustomerType type, int points) {
		super();
		this.user = user;
		this.customerType = type;
		this.points = points;
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType type) {
		this.customerType = type;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	@Override
	public String toString() {
		return user.getUsername() + "," + customerType.getType() + "," + points;
	}
	
}
