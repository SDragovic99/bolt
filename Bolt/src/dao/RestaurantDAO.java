package dao;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Collection;
import java.util.HashMap;

import beans.Location;
import beans.Restaurant;
import beans.RestaurantType;

public class RestaurantDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/restaurants.csv";
	private HashMap<Integer, Restaurant> restaurants;
	
	public RestaurantDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.restaurants = loadRestaurants();
	}
	
	public Restaurant findRestaurant(Integer id) {
		Restaurant r = restaurants.containsKey(id) ? restaurants.get(id) : null;
		if(r != null) {
			if(!r.getIsDeleted()) {
				return r;
			}
		}
		return null;
	}
	
	public Integer generateId() {
		return restaurants.size() + 1;
	}
	
	public Collection<Restaurant> getAll(){
		return restaurants.values().stream()
				.filter(r -> !r.getIsDeleted())
				.collect(Collectors.toList());
	}
	
	public void addRestaurant(Restaurant restaurant) {
		restaurants.put(restaurant.getId(), restaurant);
		csvWriter.write(restaurant.toString());
	}
	
	public void updateRestaurant(Integer id, Restaurant restaurant) {
		restaurants = loadRestaurants();
		restaurants.replace(id, restaurant);
		csvWriter.clearFile();
		for (Restaurant r : restaurants.values()) {
			csvWriter.write(r.toString());
		}
	}
	
	public void deleteRestaurant(Integer id) {
		restaurants = loadRestaurants();
		restaurants.get(id).setIsDeleted(true);
		csvWriter.clearFile();
		
		for (Restaurant r : restaurants.values()) {
			csvWriter.write(r.toString());
		}
	}
	
	private HashMap<Integer, Restaurant> loadRestaurants(){
		HashMap<Integer, Restaurant> restaurants = new HashMap<>();
		List<String[]> data = csvReader.read();
		for(String[] strings : data) {
			Restaurant restaurant = new Restaurant(Integer.parseInt(strings[0]), strings[1], RestaurantType.valueOf(strings[2]), Boolean.parseBoolean(strings[3]), strings[4], 
					new Location(Double.parseDouble(strings[5]), Double.parseDouble(strings[6]), strings[7], strings[8], strings[9]), Double.parseDouble(strings[10]), Boolean.parseBoolean(strings[11]));
			restaurants.put(Integer.parseInt(strings[0]), restaurant);
		}
		
		return restaurants;
	}
}
