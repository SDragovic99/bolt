package dto;

import beans.ProductType;

public class ProductDTO {
	private String currentProductId;
	private Boolean imageChanged;
	private int restaurantId;
	private String name;
	private double price;
	private ProductType type;
	private int quantity;
	private String description;
	private String imagePath;
	
	public ProductDTO(String currentProductId, Boolean imageChanged, int restaurantId, String name, double price,
			ProductType type, int quantity, String description, String imagePath) {
		super();
		this.currentProductId = currentProductId;
		this.imageChanged = imageChanged;
		this.restaurantId = restaurantId;
		this.name = name;
		this.price = price;
		this.type = type;
		this.quantity = quantity;
		this.description = description;
		this.imagePath = imagePath;
	}

	public String getCurrentProductId() {
		return currentProductId;
	}

	public void setCurrentProductId(String currentProductId) {
		this.currentProductId = currentProductId;
	}

	public Boolean getImageChanged() {
		return imageChanged;
	}

	public void setImageChanged(Boolean imageChanged) {
		this.imageChanged = imageChanged;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	
}
