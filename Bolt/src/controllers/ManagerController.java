package controllers;

import static spark.Spark.get;

import java.security.Key;

import com.google.gson.Gson;

import beans.Manager;
import services.AuthService;
import services.ManagerService;

public class ManagerController {
	private AuthService authService;
	private ManagerService managerService;
	private static Gson gson = new Gson();
	
	public ManagerController(Key key) {
		authService = new AuthService(key);
		
		get("/managers", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {  
			    managerService = new ManagerService();
				return gson.toJson(managerService.getManagers());
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		get("/managers/:username", (req, res) -> {
			res.type("application/json");
			String username = req.params("username");
			
			if (authService.isAuthorized(req)) { 
				managerService = new ManagerService();
				Manager manager = managerService.getManager(username);
				if(manager == null) {
					res.status(400);
					return "User not found: " + username;
				}
				return gson.toJson(manager);
			}
			
			res.status(403);
			return "Forbidden";
		});
	}

}
