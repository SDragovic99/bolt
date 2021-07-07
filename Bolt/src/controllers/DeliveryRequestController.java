package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.delete;
import java.security.Key;

import com.google.gson.Gson;

import beans.DeliveryRequest;
import services.AuthService;
import services.DeliveryRequestService;

public class DeliveryRequestController {
	private AuthService authService;
	private DeliveryRequestService requestService;
	private static Gson gson = new Gson();
	
	public DeliveryRequestController(Key key) {
		authService = new AuthService(key);
		requestService = new DeliveryRequestService();
		
		get("/delivery-requests", (req, res) -> {
			res.type("application/json");
			
			if(authService.isAuthorized(req)) {
				return gson.toJson(requestService.getAll());
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		get("/delivery-requests/:delivererId", (req, res) -> {
			res.type("application/json");
			String delivererId = req.params("delivererId");
			
			if(authService.isAuthorized(req)) {
				return gson.toJson(requestService.get(delivererId));
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		post("/delivery-requests", (req, res) -> {
			res.type("application/json");
			DeliveryRequest request = gson.fromJson(req.body(), DeliveryRequest.class);
			
			if(authService.isAuthorized(req)) {
				requestService.addRequest(request);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		delete("/delivery-requests/:orderId", (req, res) -> {
			res.type("application/json");
			String orderId = req.params("orderId");
			
			if(authService.isAuthorized(req)) {
				requestService.deleteAll(orderId);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
}
