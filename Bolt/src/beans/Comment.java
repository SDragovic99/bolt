package beans;

public class Comment {
	private int id;
	private String customerId;
	private int restaurantId;
	private String description;
	private int review;
	private CommentStatus status;
	private Boolean isDeleted;
	
	public Comment() {
		super();
	}

	public Comment(int id, String customerId, int restaurantId, String description, int review,
			CommentStatus status) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
		this.description = description;
		this.review = review;
		this.status = status;
		this.isDeleted = false;
	}
	
	public Comment(int id, String customerId, int restaurantId, String description, int review, CommentStatus status,
			Boolean isDeleted) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
		this.description = description;
		this.review = review;
		this.status = status;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getReview() {
		return review;
	}

	public void setReview(int review) {
		this.review = review;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	@Override
	public String toString() {
		return id + "," + customerId + "," + restaurantId + "," + description + "," + review + "," + status + "," + isDeleted;
	}
	
	
}
