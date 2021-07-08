package services;

import java.text.ParseException;
import java.util.Collection;

import beans.Customer;
import beans.Order;
import dao.CustomerDAO;
import dao.CustomerTypeDAO;

public class CustomerService {
	private CustomerDAO customerDAO;
	private CustomerTypeDAO customerTypeDAO;
	
	public CustomerService() throws ParseException {
		customerDAO = new CustomerDAO();
		customerTypeDAO = new CustomerTypeDAO();
	}
	
	public Collection<Customer> getAll(){
		return customerDAO.getAll();
	}
	
	public Customer getCustomer(String username) {
		return customerDAO.findCustomer(username);
	}
	
	public void addPoints(Order order) {
		Customer customer = customerDAO.findCustomer(order.getCustomerId());
		int customerPoints = customer.getPoints() + (int)(order.getTotal()/1000 * 133);
		customer.setPoints(customerPoints);
		customer.setCustomerType(customerTypeDAO.assignType(customerPoints));
		customerDAO.updateCustomer(customer);
	}
	
	public void deductPoints(Order order) {
		Customer customer = customerDAO.findCustomer(order.getCustomerId());
		int customerPoints = customer.getPoints() - (int)(order.getTotal()/1000 * 133 * 4);
		customer.setPoints(customerPoints);
		customer.setCustomerType(customerTypeDAO.assignType(customerPoints));
		customerDAO.updateCustomer(customer);
	}
}
