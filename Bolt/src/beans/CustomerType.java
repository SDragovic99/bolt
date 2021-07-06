package beans;

public class CustomerType {
	private Type type;
	private double discount;
	private int pointsNeeded;
	
	public CustomerType() {
		this.type = Type.regular;
		this.discount = 0.00;
		this.pointsNeeded = 0;
	}
	
	public CustomerType(Type type, double discount, int pointsNeeded) {
		super();
		this.type = type;
		this.discount = discount;
		this.pointsNeeded = pointsNeeded;
	}
	
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getPointsNeeded() {
		return pointsNeeded;
	}
	public void setPointsNeeded(int pointsNeeded) {
		this.pointsNeeded = pointsNeeded;
	}
	@Override
	public String toString() {
		return type + "," + discount + "," + pointsNeeded;
	}
}
