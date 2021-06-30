package controllers;

import static spark.Spark.post;
import java.security.Key;

import com.google.gson.Gson;

import beans.Article;
import io.jsonwebtoken.Jwts;
import services.ArticleService;

public class ArticleController {
	private ArticleService articleService;
	private static Gson gson = new Gson();
	
	public ArticleController(Key key) {
		this.articleService = new ArticleService();
		
		post("/articles", (req, res) -> {
			res.type("application/json");
			
			String auth = req.headers("Authorization");
			if ((auth != null) && (auth.contains("Bearer "))) {
				String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
				try {
				    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
					Article article = gson.fromJson(req.body(), Article.class);
					if(articleService.addArticle(article) == null) {
						res.status(400);
						return "Bad request";
					}
					res.status(200);
					return "SUCCESS";
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			res.status(403);
			return "Forbidden";
		});
	}
}
