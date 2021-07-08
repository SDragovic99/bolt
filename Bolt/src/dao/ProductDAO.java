package dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

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
		Product product = products.containsKey(id) ? products.get(id) : null;
		if(product != null) {
			if(!product.getIsDeleted()) {
				return product;
			}
		}
		return null;
	}
	
	public void addProduct(Product product) {
		String id = product.getName() + Integer.toString(product.getRestaurantId());
		products.put(id, product);
		csvWriter.write(product.toString());
	}
	
	public Collection<Product> getProducts(Integer restaurantId){
		return products.values().stream()
				.filter(p -> p.getRestaurantId() == restaurantId && !p.getIsDeleted())
				.collect(Collectors.toList());
	}
	
	public void updateProduct(String currentProductId, Product product) {
		products.remove(currentProductId);
		csvWriter.rewrite(product.toString());
		for(Product currentProduct : products.values()) {
			csvWriter.write(currentProduct.toString());
		}
		String newProductId = product.getName() + Integer.toString(product.getRestaurantId());
		products.put(newProductId, product);
	}
	
	public void deleteProduct(String id) {
		products = loadProducts();
		products.get(id).setIsDeleted(true);
		csvWriter.clearFile();
		
		for (Product p : products.values()) {
			csvWriter.write(p.toString());
		}
	}
	
	private HashMap<String, Product> loadProducts(){
		HashMap<String, Product> products = new HashMap<>();
		List<String[]> data = csvReader.read();
		for(String[] strings : data) {
			Product product = new Product(Integer.parseInt(strings[0]), strings[1], Double.parseDouble(strings[2]), 
					ProductType.valueOf(strings[3]), Integer.parseInt(strings[4]), strings[5], strings[6], Boolean.parseBoolean(strings[7]));
			products.put(strings[1] + strings[0], product);
		}
		return products;
	}
}
