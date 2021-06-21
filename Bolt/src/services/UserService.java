package services;

import beans.Role;
import beans.User;
import dao.UserDAO;

public class UserService {
	private UserDAO userDAO;
	
	public UserService() {
		this.userDAO = new UserDAO();
	}
	
	public User registerUser(User user) {
		User existingUser = userDAO.findUser(user.getUsername());
		if (existingUser == null) {
			user.setRole(Role.customer);
			userDAO.addUser(user);
			return user;
		}
		return null;
	}
}
