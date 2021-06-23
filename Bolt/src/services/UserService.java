package services;

import beans.Manager;
import beans.Role;
import beans.User;
import dao.ManagerDAO;
import dao.UserDAO;

public class UserService {
	private UserDAO userDAO;
	private ManagerDAO managerDAO;
	
	public UserService() {
		this.userDAO = new UserDAO();
		this.managerDAO = new ManagerDAO();
	}
	
	public User registerUser(User user) {
		User existingUser = userDAO.findUser(user.getUsername());
		if (existingUser == null) {
			userDAO.addUser(user);
			if(user.getRole() == Role.manager) {
				managerDAO.addManager(new Manager(user.getUsername(), 0));
			}
			return user;
		}
		return null;
	}
	
	public User findUser(String username) {
		User user = userDAO.findUser(username);
		return user;
	}
}
