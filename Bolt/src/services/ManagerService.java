package services;

import java.util.ArrayList;
import java.util.Collection;

import beans.Manager;
import beans.Role;
import beans.User;
import dao.ManagerDAO;
import dao.UserDAO;

public class ManagerService {
	private UserDAO userDAO;
	private ManagerDAO managerDAO;
	
	public ManagerService() {
		this.userDAO = new UserDAO();
		this.managerDAO = new ManagerDAO();
	}
	
	public Collection<User> getManagers(){
		ArrayList<User> managers = new ArrayList<User>();
		for(User user : userDAO.getAll()){
			if(user.getRole() == Role.manager && managerDAO.checkIfManagerAvailable(user.getUsername())) {
				managers.add(user);
			}
		}
		return managers;
	}
	
	public Manager updateManager(String username, int restaurantId) {
		Manager existingManager = managerDAO.findManager(username);
		if(existingManager != null) {
			existingManager.setRestaurantId(restaurantId);
			managerDAO.updateManager(existingManager);
			return existingManager;
		}
		return null;
	}
	
	public int getManagersRestaurantId(String username) {
		int restaurantId = managerDAO.getManagersRestaurantId(username);
		return restaurantId;
	}
}
