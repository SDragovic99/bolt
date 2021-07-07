package dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import beans.DeliveryRequest;

public class DeliveryRequestDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/delivery-requests.csv";
	private ArrayList<DeliveryRequest> requests;
	
	public DeliveryRequestDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.requests = loadRequests();
	}
	
	public void addRequest(DeliveryRequest req) {
		requests.add(req);
		csvWriter.write(req.toString());
	}
	
	public Collection<DeliveryRequest> getAll(){
		return requests;
	}
	
	public List<DeliveryRequest> get(String delivererId) {
		return requests.stream()
				.filter(req -> delivererId.equals(req.getDelivererId()))
				.collect(Collectors.toList());
	}
	
	public void deleteAll(String orderId) {
		requests.removeIf(value -> value.getOrderId().equals(orderId));
		csvWriter.clearFile();
		for (DeliveryRequest deliveryRequest : requests) {
			csvWriter.write(deliveryRequest.toString());
		}
	}

	private ArrayList<DeliveryRequest> loadRequests() {
		ArrayList<DeliveryRequest> requests = new ArrayList<>();
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			DeliveryRequest req = new DeliveryRequest(strings[0], Integer.parseInt(strings[1]), strings[2]);
			requests.add(req);
		}
		
		return requests;
	}
}
