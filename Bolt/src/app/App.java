package app;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.security.Key;

import controllers.CartController;
import controllers.CustomerController;
import controllers.ManagerController;
import controllers.OrderController;
import controllers.RestaurantController;
import controllers.UserController;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class App {
	static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public static void main(String[] args) throws Exception{
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		new UserController(key);
		new CustomerController(key);
		new ManagerController(key);
		new RestaurantController(key);
		new CartController(key);		
		new OrderController(key);		
	}

}
