package services;

import java.text.ParseException;
import java.util.Collection;
import java.util.List;

import beans.Order;
import dao.OrderDAO;

public class OrderService {
	private OrderDAO orderDAO;
	
	public OrderService() throws ParseException {
		this.orderDAO = new OrderDAO();
	}
	
	public Order addOrder(Order order) throws ParseException {
		orderDAO.addOrder(order);
		return order;
	}
	
	public Collection<Order> getAll(){
		return orderDAO.getAll();
	}
	
	public Order get(String id) {
		return orderDAO.get(id);
	}
	
	public void updateOrder(Order order) {
		orderDAO.updateOrder(order);
	}
	
	public List<String> getCustomers(Integer restaurantId){
		return orderDAO.getCustomers(restaurantId);
	}
}
