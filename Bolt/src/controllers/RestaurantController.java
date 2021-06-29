package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Restaurant;
import dto.RestaurantDTO;
import io.jsonwebtoken.Jwts;

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
		
		get("/restaurants/:username", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				    String username = req.params("username");
				    int restaurantId = managerService.getManagersRestaurantId(username);
				    Restaurant restaurant = restaurantService.findRestaurant(restaurantId);
				    if(restaurant == null) {
				    	res.status(400);
				    	return "Restaurant not found";
				    }
				    return gson.toJson(restaurant);
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
	}
}
