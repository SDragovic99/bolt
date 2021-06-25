package controllers;

import static spark.Spark.get;
import java.security.Key;

import com.google.gson.Gson;

import io.jsonwebtoken.Jwts;
import services.CustomerService;

public class CustomerController {
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(Key key) {
		this.customerService = new CustomerService();
		
		get("/customers", (req, res) -> {
			res.type("application/json");
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					return gson.toJson(customerService.getAll());
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
	}
}
