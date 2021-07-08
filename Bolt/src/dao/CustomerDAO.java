package dao;

import java.text.ParseException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import beans.Customer;
import beans.CustomerType;
import beans.User;

public class CustomerDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private UserDAO userDAO;
	private CustomerTypeDAO typeDAO;
	private String fileName = "data/customers.csv";
	private HashMap<String, Customer> customers;
		
	public CustomerDAO() throws ParseException {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.userDAO = new UserDAO();
		this.typeDAO = new CustomerTypeDAO();
		this.customers = loadCustomers();
	}
	
	public Collection<Customer> getAll(){
		return customers.values();
	}
		
	public Customer findCustomer(String id) {
		this.customers = loadCustomers();
		Customer customer = customers.containsKey(id) ? customers.get(id) : null;
		if(customer != null) {
			if(!customer.getUser().getIsDeleted()) {
				return customer;
			}
		}
		return null;
	}
		
	public void addCustomer(Customer customer) {
		customers.put(customer.getUser().getUsername(), customer);
		csvWriter.write(customer.toString());
	}
	
	public void updateCustomer(Customer customer) {
		customers.remove(customer.getUser().getUsername());
		csvWriter.rewrite(customer.toString());
		for(Customer currentCustomer : customers.values()) {
			csvWriter.write(currentCustomer.toString());
		}
		customers.put(customer.getUser().getUsername(), customer);
	}
	
	private HashMap<String, Customer> loadCustomers() {
		HashMap<String, Customer> customers = new HashMap<>();
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			User user = userDAO.findUser(strings[0]);
			CustomerType customerType = typeDAO.getType(strings[1]);
			Customer customer = new Customer(user, customerType, Integer.parseInt(strings[2]));
			customers.put(strings[0], customer);
		}
		
		return customers;
	}
	
}
