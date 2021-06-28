package controllers;

import static spark.Spark.get;

import java.security.Key;

import com.google.gson.Gson;

import io.jsonwebtoken.Jwts;
import services.ManagerService;

public class ManagerController {
	private ManagerService managerService;
	private static Gson gson = new Gson();
	
	public ManagerController(Key key) {
		this.managerService = new ManagerService();
		
		get("/managers", (req, res) -> {
			res.type("application/json");
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					return gson.toJson(managerService.getManagers());
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
	}

}