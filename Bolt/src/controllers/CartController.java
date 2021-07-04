package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.security.Key;

import com.google.gson.Gson;

import beans.Cart;
import io.jsonwebtoken.Jwts;
import services.CartService;

public class CartController {
	private CartService cartService;
	private static Gson gson = new Gson();
	
	public CartController(Key key) {
		cartService = new CartService();
		
		get("/carts/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					Cart cart = cartService.findCart(id);
				    if(cart == null) {
				    	res.status(404);
				    	return "Not found";
				    }
				    return gson.toJson(cart);
				    
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		post("/carts", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				    Cart cart = gson.fromJson(req.body(), Cart.class);
					cartService.initializeCart(cart);
					return "Success";
				    
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		put("/carts/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			Cart cart = gson.fromJson(req.body(), Cart.class);
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					if(cartService.updateCart(id, cart) == null) {
						res.status(404);
				    	return "Not found";
					}
					return "Success";				
				    
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		
		delete("/carts/:customerId", (req, res) -> {
			res.type("application/json");
			String customerId = req.params("customerId");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				    cartService.deleteCustomersCarts(customerId);	
				    return "Success";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
	}
}
