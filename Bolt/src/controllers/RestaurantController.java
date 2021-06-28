package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Restaurant;
import dto.RestaurantDTO;
import java.security.Key;

import services.ManagerService;
import services.RestaurantService;

public class RestaurantController {
	private RestaurantService restaurantService;
	private ManagerService managerService;
	private static Gson gson = new Gson();
	
	public RestaurantController(Key key) {
		this.restaurantService = new RestaurantService();
		this.managerService = new ManagerService();
		
		post("/restaurants", (req, res) -> {
			res.type("application/json");
			RestaurantDTO restaurantDTO = gson.fromJson(req.body(), RestaurantDTO.class);
			Restaurant newRestaurant = restaurantService.registerRestaurant(restaurantDTO);
			if(newRestaurant == null) {
				res.status(400);
				return "Bad request";
			}
			if(managerService.updateManager(restaurantDTO.getUsername(), newRestaurant.getId()) == null) {
				res.status(400);
				return "Bad request";
			}
			return "SUCCESS";
		});
	}
}
