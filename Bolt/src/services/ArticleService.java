package services;

import java.io.FileNotFoundException;
import java.io.IOException;

import beans.Article;
import dao.ArticleDAO;

public class ArticleService {
	private ArticleDAO articleDAO;
	private Base64ToImage decoder = new Base64ToImage();
	
	public ArticleService() {
		this.articleDAO = new ArticleDAO();
	}
	
	public Article addArticle(Article article) throws FileNotFoundException, IOException {
		String articleId = article.getName() + Integer.toString(article.getId());
		String path = "assets/article_images/article-" + articleId + ".jpg";
		decoder.Base64DecodeAndSave(article.getImagePath(), path);
		article.setImagePath(path);
		Article existingArticle = articleDAO.findArticle(articleId);
		if (existingArticle == null) {
			articleDAO.addArticle(article);
			return article;
		}
		return null;
	}
}
