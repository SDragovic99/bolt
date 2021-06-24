package dao;

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
		
	public CustomerDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.userDAO = new UserDAO();
		this.typeDAO = new CustomerTypeDAO();
		this.customers = loadCustomers();
	}
		
	public Customer findCustomer(String id) {
		return customers.containsKey(id) ? customers.get(id) : null;
	}
		
	public void addCustomer(Customer customer) {
		customers.put(customer.getUser().getUsername(), customer);
		csvWriter.write(customer.toString());
	}
	
	private HashMap<String, Customer> loadCustomers() {
		HashMap<String, Customer> customers = new HashMap<>();
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			User user = userDAO.findUser(strings[0]);
			CustomerType type = typeDAO.getType(strings[1]);
			Customer customer = new Customer(user, type, Integer.parseInt(strings[2]));
			customers.put(strings[0], customer);
		}
		
		return customers;
	}
	
}
