package services;

import java.util.Collection;

import beans.Customer;
import beans.Order;
import dao.CustomerDAO;
import dao.CustomerTypeDAO;

public class CustomerService {
	private CustomerDAO customerDAO;
	private CustomerTypeDAO customerTypeDAO;
	
	public CustomerService() {
		customerDAO = new CustomerDAO();
		customerTypeDAO = new CustomerTypeDAO();
	}
	
	public Collection<Customer> getAll(){
		return customerDAO.getAll();
	}
	
	public void addPoints(Order order) {
		Customer customer = customerDAO.findCustomer(order.getCustomerId());
		int customerPoints = customer.getPoints() + (int)(order.getTotal()/1000 * 133);
		customer.setPoints(customerPoints);
		customer.setCustomerType(customerTypeDAO.assignType(customerPoints));
		customerDAO.updateCustomer(customer);
	}
}
