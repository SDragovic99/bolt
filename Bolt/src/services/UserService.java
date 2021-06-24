package services;

import java.util.Collection;

import beans.Customer;
import beans.CustomerType;
import beans.Manager;
import beans.Role;
import beans.User;
import dao.CustomerDAO;
import dao.ManagerDAO;
import dao.UserDAO;

public class UserService {
	private UserDAO userDAO;
	private ManagerDAO managerDAO;
	private CustomerDAO customerDAO;
	
	public UserService() {
		this.userDAO = new UserDAO();
		this.managerDAO = new ManagerDAO();
		this.customerDAO = new CustomerDAO();
	}
	
	public User registerUser(User user) {
		User existingUser = userDAO.findUser(user.getUsername());
		if (existingUser == null) {
			userDAO.addUser(user);
			if(user.getRole() == Role.manager) {
				managerDAO.addManager(new Manager(user.getUsername(), 0));
			} else if(user.getRole() == Role.customer) {
				customerDAO.addCustomer(new Customer(user, new CustomerType(), 0));
			}
			return user;
		}
		return null;
	}
	
	public User findUser(String username) {
		User user = userDAO.findUser(username);
		return user;
	}
	
	public User updateUser(User user) {
		User existingUser = userDAO.findUser(user.getUsername());
		if (existingUser != null) {
			userDAO.updateUser(user);
			return user;
		}
		return null;
	}

	public Collection<User> getAll(){
		return userDAO.getAll();
	}
	
}
