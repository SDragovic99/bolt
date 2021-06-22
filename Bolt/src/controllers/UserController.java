package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.User;
import services.UserService;

public class UserController {
	private UserService userService;
	private static Gson gson = new Gson();
	
	public UserController() {
		this.userService = new UserService();
		
		post("/users", (req, res) -> {
			res.type("application/json");
			User user = gson.fromJson(req.body(), User.class);
			if(userService.registerUser(user) == null) {
				res.status(400);
				return "Bad request";
			}
			return "SUCCESS";
		});		
	}
}
