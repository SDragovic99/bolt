package dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import beans.Deliverer;

public class DelivererDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/deliverers.csv";
	private HashMap<String, Deliverer> deliverers;
	
	public DelivererDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.deliverers = loadDeliverers();
	}
	
	public Deliverer findDeliverer(String id) {
		return deliverers.containsKey(id) ? deliverers.get(id) : null;
	}
	
	public Collection<Deliverer> getAll(){
		return deliverers.values();
	}
	
	public void addDeliverer(Deliverer deliverer) {
		deliverers.put(deliverer.getUsername(), deliverer);
		csvWriter.write(deliverer.toString());
	}
	
	public void updateDeliverer(String id, Deliverer deliverer) {
		deliverers.remove(id);
		csvWriter.rewrite(deliverer.toString());
		
		for(Deliverer d : deliverers.values()) {
			csvWriter.write(d.toString());
		}
		
		deliverers.put(id, deliverer);
	}
	
	private HashMap<String, Deliverer> loadDeliverers() {
		HashMap<String, Deliverer> deliverers = new HashMap<>();
		
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			List<String> orderIds = csvReader.readList(strings[1]);
			Deliverer deliverer = new Deliverer(strings[0], orderIds);
			deliverers.put(strings[0], deliverer);
		}
		return deliverers;
	}
}
