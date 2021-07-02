package beans;

import java.util.List;

public class Cart {
	private String id;
	private String customerId;	
	private List<String> products;
	private double total;
	
	public Cart() {
		super();
	}
	
	public Cart(String id, String customerId, List<String> products, double total) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.products = products;
		this.total = total;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public List<String> getProducts() {
		return products;
	}
	public void setProducts(List<String> products) {
		this.products = products;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
}
