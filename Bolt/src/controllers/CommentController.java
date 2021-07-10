package controllers;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.security.Key;

import com.google.gson.Gson;

import beans.Comment;
import services.AuthService;
import services.CommentService;
import services.RestaurantService;

public class CommentController {
	private AuthService authService;
	private CommentService commentService;
	private RestaurantService restaurantService;
	
	private static Gson gson = new Gson();
	
	public CommentController(Key key) {
		authService = new AuthService(key);
		commentService = new CommentService();
		restaurantService = new RestaurantService();
		
		post("/comments", (req, res) -> {
			res.type("application/json");
			
			if (authService.isAuthorized(req)) {
				Comment comment = gson.fromJson(req.body(), Comment.class);
				commentService.addComment(comment);
				res.status(200);
				return "SUCCESS";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		get("/comments/:restaurantId", (req, res) -> {
			res.type("application/json");
			Integer restaurantId = Integer.parseInt(req.params("restaurantId"));
			
			if(authService.isAuthorized(req)) {
				commentService = new CommentService();
				return gson.toJson(commentService.getAll(restaurantId));
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		put("/comments/:id", (req, res) -> {
			res.type("application/json");
			Integer id = Integer.parseInt(req.params("id"));
			
			if(authService.isAuthorized(req)) {
				commentService = new CommentService();
				Comment comment = gson.fromJson(req.body(), Comment.class);
				commentService.updateComment(id, comment);
				restaurantService.updateRating(comment.getRestaurantId());
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
		
		delete("/comments/:id", (req, res) -> {
			res.type("application/json");
			Integer id = Integer.parseInt(req.params("id"));
			
			if(authService.isAuthorized(req)) {
				Comment comment = commentService.findComment(id);
				commentService.deleteComment(id);		
				restaurantService.updateRating(comment.getRestaurantId());
				return "Success";
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
}
