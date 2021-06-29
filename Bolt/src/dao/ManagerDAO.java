package dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import beans.Manager;

public class ManagerDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/managers.csv";
	private HashMap<String, Manager> managers;
	
	public ManagerDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.managers = loadManagers();
	}
	
	public Manager findManager(String id) {
		return managers.containsKey(id) ? managers.get(id) : null;
	}
	
	public Collection<Manager> getAll(){
		return managers.values();
	}
	
	public void addManager(Manager manager) {
		managers.put(manager.getUsername(), manager);
		csvWriter.write(manager.toString());
	}
	
	public boolean checkIfManagerAvailable(String username) {
		this.managers = loadManagers();
		Manager manager = managers.get(username);
		if(manager.getRestaurantId() == 0){
			return true;
		}
		return false;
	}
	
	public HashMap<String, Manager> loadManagers(){
		HashMap<String, Manager> managers = new HashMap<>();
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			Manager manager = new Manager(strings[0], Integer.parseInt(strings[1]));
			managers.put(strings[0], manager);
		}
		
		return managers;
	}

	public void updateManager(Manager manager) {
		managers.remove(manager.getUsername());
		csvWriter.rewrite(manager.toString());
		for(Manager currentManager : managers.values()) {
			csvWriter.write(currentManager.toString());
		}
		
		managers.put(manager.getUsername(), manager);
	}

	public int getManagersRestaurantId(String username) {
		Manager manager = managers.get(username);
		return manager.getRestaurantId();
	}
}
