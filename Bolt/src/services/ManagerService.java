package services;

import java.text.ParseException;
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
	
	public ManagerService() throws ParseException {
		this.userDAO = new UserDAO();
		this.managerDAO = new ManagerDAO();
	}
	
	public Collection<User> getManagers(){
		ArrayList<User> managers = new ArrayList<User>();
		for(User user : userDAO.getAll()){
			if(!user.getIsDeleted() && user.getRole() == Role.manager && managerDAO.checkIfManagerAvailable(user.getUsername())) {
				managers.add(user);
			}
		}
		return managers;
	}
	
	public Manager getManager(String username) throws ParseException {
		UserDAO userDAO = new UserDAO();
		Manager manager = managerDAO.findManager(username);
		if(userDAO.findUser(manager.getUsername()) == null){
			return null;
		}
		return manager;
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
