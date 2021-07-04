package dao;

import java.util.Collection;
import java.util.HashMap;

import beans.Cart;

public class CartDAO {
	private static HashMap<String, Cart> carts = new HashMap<>();
	
	public CartDAO() {}
	
	public Collection<Cart> getCarts(){
		return carts.values();
	}
	
	public Cart findCart(String id) {
		return carts.containsKey(id) ? carts.get(id) : null;
	}
	
	public void addCart(Cart cart) {
		carts.put(cart.getId(), cart);
	}
	
	public Cart updateCart(String id, Cart cart) {
		return carts.replace(id, cart);
	}
	
	public void deleteCustomersCarts(String customerId) {
		carts.values().removeIf(value -> value.getCustomerId().equals(customerId));
	}
}
