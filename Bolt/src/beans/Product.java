package beans;

public class Product {
	private int restaurantId;
	private String name;
	private double price;
	private ProductType type;
	private int quantity;
	private String description;
	private String imagePath;
	private Boolean isDeleted;
	
	public Product() {
		super();
	}

	public Product(int restaurantId, String name, double price, ProductType type, int quantity, String description,
			String imagePath) {
		super();
		this.restaurantId = restaurantId;
		this.name = name;
		this.price = price;
		this.type = type;
		this.quantity = quantity;
		this.description = description;
		this.imagePath = imagePath;
		this.isDeleted = false;
	}

	public Product(int restaurantId, String name, double price, ProductType type, int quantity, String description,
			String imagePath, Boolean isDeleted) {
		super();
		this.restaurantId = restaurantId;
		this.name = name;
		this.price = price;
		this.type = type;
		this.quantity = quantity;
		this.description = description;
		this.imagePath = imagePath;
		this.isDeleted = isDeleted;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int id) {
		this.restaurantId = id;
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

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	@Override
	public String toString() {
		return restaurantId + "," + name + "," + price + "," + type + "," + quantity + "," + description + "," + imagePath + "," + isDeleted;
	}

}
