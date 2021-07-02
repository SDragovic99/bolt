package beans;

import java.util.Date;
import java.util.List;

public class Order {
	private String id;
	private Date date;
	private double total;
	private OrderStatus status;
	private String customerId;
	private Integer restaurantId;
	private List<String> products;
	
	public Order() {
		super();
	}

	public Order(String id, Date date, double total, OrderStatus status, String customerId, Integer restaurantId,
			List<String> products) {
		super();
		this.id = id;
		this.date = date;
		this.total = total;
		this.status = status;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
		this.products = products;
	}
	
	public Order(Date date, double total, OrderStatus status, String customerId, Integer restaurantId,
			List<String> products) {
		super();
		this.date = date;
		this.total = total;
		this.status = status;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
		this.products = products;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public List<String> getProducts() {
		return products;
	}

	public void setProducts(List<String> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return id + "," + date + "," + total + "," + status + "," + customerId + "," + restaurantId + "," + String.join(";", products);
	}

	
}
