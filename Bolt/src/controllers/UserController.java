package controllers;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.security.Key;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.Role;
import beans.User;
import dto.CredentialsDTO;
import dto.UserDTO;
import services.AuthService;
import services.CancellationLogService;
import services.CustomerService;
import services.UserService;

public class UserController {
	private AuthService authService;
	private UserService userService;
	private CustomerService customerService = new CustomerService();
	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").setPrettyPrinting().create();
	
	public UserController(Key key) throws ParseException {
		authService = new AuthService(key);
		userService = new UserService();
		
		get("/users", (req, res) -> {
			res.type("application/json");

			if (authService.isAuthorized(req)) {
				userService = new UserService();
				List<UserDTO> users = new ArrayList<>();
				for (User u : userService.getAll()) {
					UserDTO dto = mapToDTO(u);
					users.add(dto);
				}
				return gson.toJson(users);
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

			if (authService.isAuthorized(req)) {				
			    String username = req.params("username");
			    User user = userService.findUser(username);
				if(user == null) {
					res.status(400);
					return "User not found: " + username;
				}
				return gson.toJson(user);
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		get("/spammers", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
				CancellationLogService logService = new CancellationLogService();
				List<UserDTO> users = new ArrayList<>();
				for (User u : logService.getSpammers()) {
					UserDTO dto = mapToDTO(u);
					users.add(dto);
				}
				return gson.toJson(users);
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/users/:username", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {				
				User user = gson.fromJson(req.body(), User.class);
				if(userService.updateUser(user) == null) {
					res.status(400);
					return "Bad request";
				}
				return "SUCCESS";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		post("/workers", (req, res) -> {
			res.type("application/json");
;
			if (authService.isAuthorized(req)) {
				User user = gson.fromJson(req.body(), User.class);
				if(userService.registerUser(user) == null) {
					res.status(400);
					return "Bad request";
				}
				return "SUCCESS";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		post("/auth", (req, res) -> {
			res.type("application/json");
			CredentialsDTO cred = gson.fromJson(req.body(), CredentialsDTO.class);
			User user = userService.findUser(cred.getUsername());
			
			if(user != null) {
				if(user.getPassword().equals(cred.getPassword()) && !user.getIsDeleted() && !user.getIsBlocked()) {
					String jws = authService.buildToken(user);
					
					res.status(200);
					return gson.toJson(jws);
				}
			}
			
			res.status(400);
			return "Bad request";
		});	
		
		delete("/users/:username", (req, res) -> {
			res.type("application/json");
			String username = req.params("username");
			
			if(authService.isAuthorized(req)) {
				userService.deleteUser(username);
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
	}
	
	private UserDTO mapToDTO(User user) {
		if(user.getRole() == Role.customer) {
			Customer customer = customerService.getCustomer(user.getUsername());
			return new UserDTO(user.getUsername(), user.getName(), user.getSurname(), 
					user.getGender(), user.getDateOfBirth(), user.getRole(), user.getIsBlocked(),
					user.getIsDeleted(), customer.getCustomerType(), customer.getPoints());
		}
		return new UserDTO(user.getUsername(), user.getName(), user.getSurname(), 
				user.getGender(), user.getDateOfBirth(), user.getRole(), user.getIsBlocked(),
				user.getIsDeleted());
	}
}
