package beans;

public class Article {
	private int id;
	private String name;
	private double price;
	private ArticleType type;
	private int quantity;
	private String description;
	private String imagePath;
	
	public Article() {
		super();
	}

	public Article(int id, String name, double price, ArticleType type, int quantity, String description,
			String imagePath) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.type = type;
		this.quantity = quantity;
		this.description = description;
		this.imagePath = imagePath;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public ArticleType getType() {
		return type;
	}

	public void setType(ArticleType type) {
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

	@Override
	public String toString() {
		return id + "," + name + "," + price + "," + type + "," + quantity + "," + description + "," + imagePath;
	}

}
