package services;

import java.text.ParseException;

import beans.Deliverer;
import dao.DelivererDAO;
import dao.UserDAO;

public class DelivererService {
	private DelivererDAO delivererDAO;
	
	public DelivererService() {
		delivererDAO = new DelivererDAO();
	}
	
	public Deliverer get(String id) throws ParseException {
		UserDAO userDAO = new UserDAO();
		Deliverer deliverer =  delivererDAO.findDeliverer(id);
		if(userDAO.findUser(deliverer.getUsername()) == null) {
			return null;
		}
		return deliverer;
	}
	
	public void addDeliverer(Deliverer deliverer) {
		delivererDAO.addDeliverer(deliverer);
	}
	
	public void updateDeliverer(String id, Deliverer deliverer) {
		delivererDAO.updateDeliverer(id, deliverer);
	}
}	
