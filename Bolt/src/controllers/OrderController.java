package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.security.Key;
import java.text.ParseException;

import com.google.gson.Gson;

import beans.Order;
import services.AuthService;
import services.CustomerService;
import services.OrderService;

public class OrderController {
	private AuthService authService;
	private OrderService orderService;
	private CustomerService customerService;
	
	private static Gson gson = new Gson();
	
	public OrderController(Key key) throws ParseException {
		authService = new AuthService(key);
		orderService = new OrderService();
		customerService = new CustomerService();
		
		get("/orders", (req, res) -> {
			res.type("application/json");
			
			if(authService.isAuthorized(req)) {
				orderService = new OrderService();
				return gson.toJson(orderService.getAll());
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		get("/orders/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			
			if(authService.isAuthorized(req)) {
				orderService = new OrderService();
				Order o = orderService.get(id);
				if(o == null) {
					res.status(404);
					return "Not found";
				}
				return gson.toJson(o);
			}
			
			res.status(403);
			return "Forbidden";
		});
	
		post("/orders", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
				Order order = gson.fromJson(req.body(), Order.class);
				orderService.addOrder(order);
				customerService.addPoints(order);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/orders/:id", (req, res) -> {
			res.type("application/json");
			
			if(authService.isAuthorized(req)) {
				Order order = gson.fromJson(req.body(), Order.class);
				orderService.updateOrder(order);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
	
	}
}
