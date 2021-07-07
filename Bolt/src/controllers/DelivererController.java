package controllers;

import java.security.Key;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.Deliverer;
import services.AuthService;
import services.DelivererService;

public class DelivererController {
	private AuthService authService;
	private DelivererService delivererService;
	private static Gson gson = new Gson();
	
	public DelivererController(Key key) {
		authService = new AuthService(key);
		
		get("/deliverers/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			
			if(authService.isAuthorized(req)) {
				delivererService = new DelivererService();
				Deliverer d = delivererService.get(id);
				if(d == null) {
					res.status(404);
					return "Not found";
				}
				return gson.toJson(d);
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		post("/deliverers", (req, res) -> {
			res.type("application/json");
			
			if(authService.isAuthorized(req)) {
				Deliverer deliverer = gson.fromJson(req.body(), Deliverer.class);
				delivererService = new DelivererService();
				delivererService.addDeliverer(deliverer);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/deliverers/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			
			if(authService.isAuthorized(req)) {
				Deliverer deliverer = gson.fromJson(req.body(), Deliverer.class);
				delivererService = new DelivererService();
				delivererService.updateDeliverer(id, deliverer);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
	
	
}
