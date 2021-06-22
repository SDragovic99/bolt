package controllers;

import static spark.Spark.post;

import java.security.Key;
import java.util.Date;

import com.google.gson.Gson;

import beans.User;
import dto.CredentialsDTO;
import io.jsonwebtoken.Jwts;
import services.UserService;

public class UserController {
	private UserService userService;
	private static Gson gson = new Gson();
	
	public UserController(Key key) {
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
		
		post("/auth", (req, res) -> {
			res.type("application/json");
			CredentialsDTO cred = gson.fromJson(req.body(), CredentialsDTO.class);
			User user = userService.findUser(cred.getUsername());
			if(user != null) {
				if(user.getPassword().equals(cred.getPassword())) {
					String jws = Jwts.builder()
							.setSubject(user.getUsername())
							.claim("Role", user.getRole())
							.setExpiration(new Date(new Date().getTime() + 360000*10L))
							.signWith(key)
							.compact();
					res.status(200);
					return gson.toJson(jws);
				}
			}
			
			res.status(400);
			return "Bad request";
		});	
		
	}
}
