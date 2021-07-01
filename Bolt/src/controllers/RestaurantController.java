package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Product;
import beans.Restaurant;
import dto.RestaurantDTO;
import io.jsonwebtoken.Jwts;

import java.security.Key;

import services.ManagerService;
import services.ProductService;
import services.RestaurantService;

public class RestaurantController {
	private RestaurantService restaurantService;
	private ManagerService managerService;
	private ProductService productService;
	private static Gson gson = new Gson();
	
	public RestaurantController(Key key) {
		this.restaurantService = new RestaurantService();
		this.managerService = new ManagerService();
		
		get("/restaurants", (req, res) -> {
			res.type("application/json");
			return gson.toJson(restaurantService.getAll());
		});
		
		post("/restaurants", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				    RestaurantDTO restaurantDTO = gson.fromJson(req.body(), RestaurantDTO.class);
					Restaurant newRestaurant = restaurantService.registerRestaurant(restaurantDTO);
					if(newRestaurant == null) {
						res.status(400);
						return "Bad request";
					}
					managerService = new ManagerService();
					if(managerService.updateManager(restaurantDTO.getUsername(), newRestaurant.getId()) == null) {
						res.status(400);
						return "Bad request";
					}
					return "SUCCESS";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		get("restaurants/:id", (req, res) -> {
			res.type("application/json");
			
			Integer id = Integer.parseInt(req.params("id"));
			Restaurant restaurant = restaurantService.findRestaurant(id);
			return gson.toJson(restaurant);
		});
		
		post("/restaurants/:id/products", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					Product product = gson.fromJson(req.body(), Product.class);
					productService = new ProductService();
					if(productService.addProduct(product) == null) {
						res.status(400);
						return "Bad request";
					}
					res.status(200);
					return "SUCCESS";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		get("/restaurants/:id/products", (req, res) -> {
			res.type("application/json");
			
			Integer id = Integer.parseInt(req.params("id"));
			productService = new ProductService();
			return gson.toJson(productService.getProducts(id));
		});
	}
}
