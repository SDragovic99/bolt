package controllers;

import static spark.Spark.post;

import java.security.Key;
import java.text.ParseException;

import com.google.gson.Gson;

import beans.Order;
import services.AuthService;
import services.OrderService;

public class OrderController {
	private AuthService authService;
	public OrderService orderService;
	private static Gson gson = new Gson();
	
	public OrderController(Key key) throws ParseException {
		authService = new AuthService(key);
		orderService = new OrderService();
	
		post("/orders", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
				Order order = gson.fromJson(req.body(), Order.class);
				orderService.addOrder(order);
				res.status(200);
				return "SUCCESS";
			}
			res.status(403);
			return "Forbidden";
		});
	
	}
}
