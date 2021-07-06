package services;

import java.text.ParseException;
import java.util.Collection;

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
}
