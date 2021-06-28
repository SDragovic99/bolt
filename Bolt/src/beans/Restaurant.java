package beans;

public class Restaurant {
	private int id;
	private String name;
	private RestaurantType type;
	private Boolean isOpen;
	private String imagePath;
	private Location location;
	private double rating;
	
	public Restaurant() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Restaurant(int id, String name, RestaurantType type, Boolean isOpen, String imagePath, Location location, double rating) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.isOpen = isOpen;
		this.imagePath = imagePath;
		this.location = location;
		this.rating = rating;
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
	public RestaurantType getType() {
		return type;
	}
	public void setType(RestaurantType type) {
		this.type = type;
	}
	public Boolean getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	
	@Override
	public String toString() {
		return id + "," + name + "," + type + "," + isOpen + "," + imagePath + "," + location.toString() + "," + rating;
	}
	
}