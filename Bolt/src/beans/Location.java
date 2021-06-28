package beans;

public class Location {
	private double longitude;
	private double latitude;
	private String address;
	private String city;
	private String postalCode;
	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Location(double longitude, double latitude, String address, String city, String postalCode) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
		this.city = city;
		this.postalCode = postalCode;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
	@Override
	public String toString() {
		return longitude + "," + latitude + "," + address + "," + city + "," + postalCode;
	}
	
}
