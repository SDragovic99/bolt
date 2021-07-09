package beans;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CancellationLog {
	private Integer id;
	private String customerId;
	private Date date;
	private String orderId;
	
	public CancellationLog() {
		super();
	}
	
	public CancellationLog(Integer id, String customerId, Date date, String orderId) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.date = date;
		this.orderId = orderId;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public String getOrderId() {
		return orderId;
	}
	
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	@Override
	public String toString() {
		return id + "," + customerId + "," + getFormattedDate() + "," + orderId;
	}
	
	private String getFormattedDate() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
		return formatter.format(date);
	}
}
