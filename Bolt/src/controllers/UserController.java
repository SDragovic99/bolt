package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.put;

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
		
		get("/users", (req, res) -> {
			res.type("application/json");
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					return gson.toJson(userService.getAll());
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
		
		post("/users", (req, res) -> {
			res.type("application/json");
			User user = gson.fromJson(req.body(), User.class);
			if(userService.registerUser(user) == null) {
				res.status(400);
				return "Bad request";
			}
			return "SUCCESS";
		});
		
		get("/users/:username", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
				    String username = req.params("username");
				    User user = userService.findUser(username);
					if(user == null) {
						res.status(400);
						return "User not found: " + username;
					}
					return gson.toJson(user);
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(400);
			return "Bad request";
		});
		
		put("/users/:username", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					User user = gson.fromJson(req.body(), User.class);
					if(userService.updateUser(user) == null) {
						res.status(400);
						return "Bad request";
					}
					return "SUCCESS";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(400);
			return "Bad request";
		});
		
		post("/workers", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					User user = gson.fromJson(req.body(), User.class);
					if(userService.registerUser(user) == null) {
						res.status(400);
						return "Bad request";
					}
					return "SUCCESS";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(400);
			return "Bad request";
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
