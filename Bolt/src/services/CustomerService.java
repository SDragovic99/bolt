package services;

import java.util.Collection;

import beans.Customer;
import dao.CustomerDAO;

public class CustomerService {
	private CustomerDAO customerDAO;
	
	public CustomerService() {
		this.customerDAO = new CustomerDAO();
	}
	
	public Collection<Customer> getAll(){
		return customerDAO.getAll();
	}
}
