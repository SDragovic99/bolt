package dao;

import java.util.HashMap;
import java.util.List;

import beans.CustomerType;
import beans.Type;

public class CustomerTypeDAO {
	private CSVReader csvReader;
	private String fileName = "data/customer-types.csv";
	private HashMap<String, CustomerType> types;
	
	public CustomerTypeDAO() {
		this.csvReader = new CSVReader(fileName);
		this.types = loadTypes();
	}
	
	public CustomerType getType(String type) {
		return types.containsKey(type) ? types.get(type) : null;
	}
	
	private HashMap<String, CustomerType> loadTypes() {
		HashMap<String, CustomerType> types = new HashMap<>();
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			CustomerType type = new CustomerType(Type.valueOf(strings[0]), Double.parseDouble(strings[1]), Integer.parseInt(strings[2]));
			types.put(strings[0], type);
		}
		
		return types;
	}
	
	public CustomerType assignType(int points) {
		CustomerType bronze = types.get("bronze");
		CustomerType silver = types.get("silver");
		CustomerType gold = types.get("gold");
		CustomerType regular = types.get("regular");
		if(points >= bronze.getPointsNeeded() && points < silver.getPointsNeeded()) {
			return bronze;
		} 
		else if(points >= silver.getPointsNeeded() && points < gold.getPointsNeeded()) {
			return silver;
		}
		else if(points >= gold.getPointsNeeded()) {
			return gold;
		} 
		else {
			return regular;
		}
	}
}
