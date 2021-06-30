package dao;

import java.util.HashMap;
import java.util.List;

import beans.Product;
import beans.ProductType;

public class ProductDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/products.csv";
	private HashMap<String, Product> products;
	
	public ProductDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.products = loadProducts();
	}
	
	public Product findProduct(String id) {
		return products.containsKey(id) ? products.get(id) : null;
	}
	
	public void addProduct(Product article) {
		String id = article.getName() + Integer.toString(article.getRestaurantId());
		products.put(id, article);
		csvWriter.write(article.toString());
	}
	
	private HashMap<String, Product> loadProducts(){
		HashMap<String, Product> products = new HashMap<>();
		List<String[]> data = csvReader.read();
		for(String[] strings : data) {
			Product product = new Product(Integer.parseInt(strings[0]), strings[1], Double.parseDouble(strings[2]), 
					ProductType.valueOf(strings[3]), Integer.parseInt(strings[4]), strings[5], strings[6]);
			products.put(strings[1] + strings[0], product);
		}
		return products;
	}
}
