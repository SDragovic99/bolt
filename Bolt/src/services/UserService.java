package services;

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
			userDAO.addUser(user);
			return user;
		}
		return null;
	}
	
	public User findUser(String username) {
		User user = userDAO.findUser(username);
		return user;
	}
}
