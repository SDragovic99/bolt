package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;

import beans.Product;
import dao.ProductDAO;
import dto.ProductDTO;

public class ProductService {
	private ProductDAO productDAO;
	private Base64ToImage decoder = new Base64ToImage();
	
	public ProductService() {
		this.productDAO = new ProductDAO();
	}
	
	public Product addProduct(Product product) throws FileNotFoundException, IOException {
		String productId = product.getName() + Integer.toString(product.getRestaurantId());
		String path = "assets/product_images/product-" + productId + ".jpeg";
		decoder.Base64DecodeAndSave(product.getImagePath(), path);
		product.setImagePath(path);
		Product existingProduct = productDAO.findProduct(productId);
		if (existingProduct == null) {
			productDAO.addProduct(product);
			return product;
		}
		return null;
	}

	public Collection<Product> getProducts(Integer restaurantId){
		return productDAO.getProducts(restaurantId);
	}
	
	public Product findProduct(String productId) {
		Product product = productDAO.findProduct(productId);
		return product;
	}
	
	public Product updateProduct(ProductDTO productDTO) throws FileNotFoundException, IOException {
		String path = productDTO.getImagePath();
		if(productDTO.getImageChanged()) {
			String productId = productDTO.getName() + Integer.toString(productDTO.getRestaurantId());
			path = "assets/product_images/product-" + productId + ".jpeg";
			decoder.Base64DecodeAndSave(productDTO.getImagePath(), path);
		}
		Product updatedProduct = new Product(productDTO.getRestaurantId(), productDTO.getName(), productDTO.getPrice(), productDTO.getType(), 
				productDTO.getQuantity(), productDTO.getDescription(), path);
		Product existingProduct = productDAO.findProduct(productDTO.getCurrentProductId());
		if(existingProduct != null) {
			productDAO.updateProduct(productDTO.getCurrentProductId(), updatedProduct);
			return updatedProduct;
		}
		return null;
	}
	
	public void deleteProduct(String id) {
		productDAO.deleteProduct(id);
	}
	
}