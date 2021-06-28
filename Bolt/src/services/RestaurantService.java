package services;

import beans.Location;
import beans.Restaurant;
import dao.RestaurantDAO;
import dto.RestaurantDTO;

public class RestaurantService {
	private RestaurantDAO restaurantDAO;
	
	public RestaurantService() {
		this.restaurantDAO = new RestaurantDAO();
	}

	public Restaurant registerRestaurant(RestaurantDTO restaurantDTO) {
		Restaurant newRestaurant = new Restaurant(restaurantDAO.generateId(), restaurantDTO.getName(), restaurantDTO.getType(), false, restaurantDTO.getImagePath(), new Location(0, 0, "ADDRESS", "CITY", "POSTALCODE"), 0);
		restaurantDAO.addRestaurant(newRestaurant);
		return newRestaurant;
	}

}
