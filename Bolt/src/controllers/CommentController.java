package controllers;

import static spark.Spark.post;

import java.security.Key;

import com.google.gson.Gson;

import beans.Comment;
import services.AuthService;
import services.CommentService;

public class CommentController {
	private AuthService authService;
	private CommentService commentService;
	
	private static Gson gson = new Gson();
	
	public CommentController(Key key) {
		authService = new AuthService(key);
		commentService = new CommentService();
		
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
	}
}
