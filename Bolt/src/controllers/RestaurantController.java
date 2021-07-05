package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.Product;
import beans.Restaurant;
import dto.ProductDTO;
import dto.RestaurantDTO;

import java.security.Key;

import services.AuthService;
import services.ManagerService;
import services.ProductService;
import services.RestaurantService;

public class RestaurantController {
	private AuthService authService;
	private RestaurantService restaurantService;
	private ManagerService managerService;
	private ProductService productService;
	private static Gson gson = new Gson();
	
	public RestaurantController(Key key) {
		authService = new AuthService(key);
		restaurantService = new RestaurantService();
		managerService = new ManagerService();
		
		get("/restaurants", (req, res) -> {
			res.type("application/json");
			return gson.toJson(restaurantService.getAll());
		});
		
		post("/restaurants", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {				
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

		get("/restaurants/:id/products", (req, res) -> {
			res.type("application/json");
			
			Integer id = Integer.parseInt(req.params("id"));
			productService = new ProductService();
			return gson.toJson(productService.getProducts(id));
		});
		
		post("/restaurants/:id/products", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {		
				Product product = gson.fromJson(req.body(), Product.class);
				productService = new ProductService();
				if(productService.addProduct(product) == null) {
					res.status(400);
					return "Bad request";
				}
				res.status(200);
				return "SUCCESS";
			}
			
			res.status(403);
			return "Forbidden";
		});

		get("/restaurants/:id/products/:name", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
			    String productId = req.params("name") + req.params("id");
			    Product product = productService.findProduct(productId);
				if(product == null) {
					res.status(400);
					return "Product not found: " + productId;
				}
				return gson.toJson(product);
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/restaurants/:id/products/:name", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
				ProductDTO productDTO = gson.fromJson(req.body(), ProductDTO.class);
				if(productService.updateProduct(productDTO) == null) {
					res.status(400);
					return "Bad request";
				}
				return "SUCCESS";
			}
			
			res.status(403);
			return "Forbidden";
		});

	}
}
