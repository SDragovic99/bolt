package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.security.Key;

import com.google.gson.Gson;

import beans.Cart;
import services.AuthService;
import services.CartService;

public class CartController {
	private AuthService authService;
	private CartService cartService;
	private static Gson gson = new Gson();
	
	
	public CartController(Key key) {
		authService = new AuthService(key);
		cartService = new CartService();	
		
		get("/carts/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
					
			if (authService.isAuthorized(req)) {		
				Cart cart = cartService.findCart(id);
			    if(cart == null) {
			    	res.status(404);
			    	return "Not found";
			    }
			    return gson.toJson(cart);
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		post("/carts", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
			    Cart cart = gson.fromJson(req.body(), Cart.class);
				cartService.initializeCart(cart);
				return "Success";			    
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/carts/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			Cart cart = gson.fromJson(req.body(), Cart.class);
			
			if (authService.isAuthorized(req)) {			
				if(cartService.updateCart(id, cart) == null) {
					res.status(404);
			    	return "Not found";
				}
				return "Success";				
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		
		delete("/carts/:customerId", (req, res) -> {
			res.type("application/json");
			String customerId = req.params("customerId");
			
			if (authService.isAuthorized(req)) {				
			    cartService.deleteCustomersCarts(customerId);	
			    return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
}
