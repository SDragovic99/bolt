package services;

import java.io.FileNotFoundException;
import java.io.IOException;

import beans.Product;
import dao.ProductDAO;

public class ProductService {
	private ProductDAO productDAO;
	private Base64ToImage decoder = new Base64ToImage();
	
	public ProductService() {
		this.productDAO = new ProductDAO();
	}
	
	public Product addProduct(Product product) throws FileNotFoundException, IOException {
		String productId = product.getName() + Integer.toString(product.getRestaurantId());
		String path = "assets/product_images/product-" + productId + ".jpg";
		decoder.Base64DecodeAndSave(product.getImagePath(), path);
		product.setImagePath(path);
		Product existingProduct = productDAO.findProduct(productId);
		if (existingProduct == null) {
			productDAO.addProduct(product);
			return product;
		}
		return null;
	}
}