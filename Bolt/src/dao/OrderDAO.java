package dao;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import beans.Order;
import beans.OrderStatus;

public class OrderDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/orders.csv";
	private HashMap<String, Order> orders;


	public OrderDAO() throws ParseException {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.orders = loadOrders();
	}
	
	public Collection<Order> getAll(){
		return orders.values();
	}
	
	public void addOrder(Order order) throws ParseException {
		order.setId(generateId());
		order.setDate(new Date());
		order.setStatus(OrderStatus.processing);
		orders.put(order.getId(), order);
		csvWriter.write(order.toString());
	}
	
	public void updateOrder(Order order) {
		orders.remove(order.getId());
		csvWriter.rewrite(order.toString());
		
		for(Order o : orders.values()) {
			csvWriter.write(o.toString());
		}
		
		orders.put(order.getId(), order);
	}

	private HashMap<String, Order> loadOrders() throws ParseException {
		HashMap<String, Order> orders = new HashMap<>();
		DateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
		
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			List<String> productNames = csvReader.readList(strings[6]);
			Date date = format.parse(strings[1]);
			Order order = new Order(strings[0], date, Double.parseDouble(strings[2]), OrderStatus.valueOf(strings[3]), strings[4], Integer.parseInt(strings[5]), productNames);
			orders.put(strings[0], order);
		}
		
		return orders;
	}
	
	private String generateId() {
		int leftLimit = 48; 
		int rightLimit = 122; 
		int targetStringLength = 10;
		Random random = new Random();
		
		String generatedString = random.ints(leftLimit, rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				.limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();
		
		return generatedString;

	}
}
