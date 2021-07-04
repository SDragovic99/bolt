package services;

import beans.Cart;
import dao.CartDAO;

public class CartService {
	private CartDAO cartDAO;
	
	public CartService() {
		this.cartDAO = new CartDAO();
	}
	
	public Cart findCart(String id) {
		return cartDAO.findCart(id);
	}
	
	public void initializeCart(Cart cart) {
		cartDAO.addCart(cart);
	}
	
	public Cart updateCart(String id, Cart cart) {
		return cartDAO.updateCart(id, cart);
	}
	
	public void deleteCustomersCarts(String customerId) {
		cartDAO.deleteCustomersCarts(customerId);
	}
}
