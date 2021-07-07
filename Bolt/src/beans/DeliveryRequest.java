package beans;

public class DeliveryRequest {
	private String orderId;
	private Integer restaurantId;
	private String delivererId;
	
	public DeliveryRequest() {
		super();
	}

	public DeliveryRequest(String orderId, Integer restaurantId, String devlivererId) {
		super();
		this.orderId = orderId;
		this.restaurantId = restaurantId;
		this.delivererId = devlivererId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getDelivererId() {
		return delivererId;
	}

	public void setDelivererId(String devlivererId) {
		this.delivererId = devlivererId;
	}

	@Override
	public String toString() {
		return orderId + "," + restaurantId + "," + delivererId;
	}
	
}
