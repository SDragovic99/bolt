package services;

import beans.Deliverer;
import dao.DelivererDAO;

public class DelivererService {
	private DelivererDAO delivererDAO;
	
	public DelivererService() {
		delivererDAO = new DelivererDAO();
	}
	
	public Deliverer get(String id) {
		return delivererDAO.findDeliverer(id);
	}
	
	public void addDeliverer(Deliverer deliverer) {
		delivererDAO.addDeliverer(deliverer);
	}
	
	public void updateDeliverer(String id, Deliverer deliverer) {
		delivererDAO.updateDeliverer(id, deliverer);
	}
}	
