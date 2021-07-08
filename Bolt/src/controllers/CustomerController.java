package controllers;

import static spark.Spark.get;
import java.security.Key;
import java.text.ParseException;

import com.google.gson.Gson;

import services.AuthService;
import services.CustomerService;

public class CustomerController {
	private AuthService authService;
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(Key key) throws ParseException {
		authService = new AuthService(key);
		customerService = new CustomerService();
		
		get("/customers", (req, res) -> {
			res.type("application/json");
					
			if (authService.isAuthorized(req)) {			
				return gson.toJson(customerService.getAll());
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
}
