package services;

import java.util.Collection;
import java.util.List;

import beans.DeliveryRequest;
import dao.DeliveryRequestDAO;

public class DeliveryRequestService {
	private DeliveryRequestDAO requestDAO;
	
	public DeliveryRequestService() {
		this.requestDAO = new DeliveryRequestDAO();
	}
	
	public void addRequest(DeliveryRequest req) {
		requestDAO.addRequest(req);
	}
	
	public Collection<DeliveryRequest> getAll(){
		return requestDAO.getAll();
	}
	
	public List<DeliveryRequest> get(String delivererId) {
		return requestDAO.get(delivererId);
	}
	
	public void deleteAll(String orderId) {
		requestDAO.deleteAll(orderId);
	}
}
