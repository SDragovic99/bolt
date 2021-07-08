package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;

import beans.Location;
import beans.Restaurant;
import dao.RestaurantDAO;
import dto.RestaurantDTO;

public class RestaurantService {
	private RestaurantDAO restaurantDAO;
	private Base64ToImage decoder = new Base64ToImage();
	
	public RestaurantService() {
		this.restaurantDAO = new RestaurantDAO();
	}

	public Restaurant registerRestaurant(RestaurantDTO restaurantDTO) throws FileNotFoundException, IOException {
		int restaurantId = restaurantDAO.generateId();
		String path = "assets/restaurant_images/restaurant-" + restaurantId + ".jpg";
		decoder.Base64DecodeAndSave(restaurantDTO.getImagePath(), path);
		Restaurant newRestaurant = new Restaurant(restaurantId, restaurantDTO.getName(), restaurantDTO.getType(), true, path, new Location(0, 0, "ADDRESS", "CITY", "POSTALCODE"), 0);
		restaurantDAO.addRestaurant(newRestaurant);
		return newRestaurant;
	}
	
	public Restaurant findRestaurant(int id) {
		Restaurant restaurant = restaurantDAO.findRestaurant(id);
		return restaurant;
	}
	
	public Collection<Restaurant> getAll(){
		return restaurantDAO.getAll();
	}

	public void updateRestaurant(Integer id, Restaurant restaurant) {
		restaurantDAO.updateRestaurant(id, restaurant);
	}
	
	public void deleteRestaurant(Integer id) {
		restaurantDAO.deleteRestaurant(id);
	}
}
