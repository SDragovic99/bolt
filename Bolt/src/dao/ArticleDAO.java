package dao;

import java.util.HashMap;
import java.util.List;

import beans.Article;
import beans.ArticleType;

public class ArticleDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/articles.csv";
	private HashMap<String, Article> articles;
	
	public ArticleDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.articles = loadArticles();
	}
	
	public Article findArticle(String id) {
		return articles.containsKey(id) ? articles.get(id) : null;
	}
	
	public void addArticle(Article article) {
		String id = article.getName() + Integer.toString(article.getId());
		articles.put(id, article);
		csvWriter.write(article.toString());
	}
	
	private HashMap<String, Article> loadArticles(){
		HashMap<String, Article> articles = new HashMap<>();
		List<String[]> data = csvReader.read();
		for(String[] strings : data) {
			Article article = new Article(Integer.parseInt(strings[0]), strings[1], Double.parseDouble(strings[2]), 
					ArticleType.valueOf(strings[3]), Integer.parseInt(strings[4]), strings[5], strings[6]);
			articles.put(strings[1] + strings[0], article);
		}
		return articles;
	}
}
