package app;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import com.google.gson.Gson;
import beans.User;
import services.UserService;

public class App {
	private static Gson gson = new Gson();
	private static UserService userService = new UserService();

	public static void main(String[] args) throws Exception{
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/users", (req, res) -> {
			res.type("application/json");
			User user = gson.fromJson(req.body(), User.class);
			if(userService.registerUser(user) == null) {
				return "ERROR";
			}
			return "SUCCESS";
		});
	}

}
