package dto;

import beans.RestaurantType;
import beans.Location;

public class RestaurantDTO {
	private String name;
	private RestaurantType type;
	private String imagePath;
	private Location location;
	private String username;
	
	public RestaurantDTO(String name, RestaurantType type, String imagePath, Location location, String username) {
		super();
		this.name = name;
		this.type = type;
		this.imagePath = imagePath;
		this.location = location;
		this.username = username;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
