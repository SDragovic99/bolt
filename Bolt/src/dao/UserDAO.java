package dao;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import beans.Role;
import beans.User;

public class UserDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/users.csv";
	private HashMap<String, User> users;
	
	public UserDAO() throws ParseException {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.users = loadUsers();
	}
	
	public User findUser(String id) {
		User user = users.containsKey(id) ? users.get(id) : null;
		if(user != null) {
			if(!user.getIsDeleted()) {
				return user;
			}
		}
		return null;
	}
	
	public Collection<User> getAll() {
		return users.values().stream()
				.filter(user -> !user.getIsDeleted())
				.collect(Collectors.toList());
	}
	
	public void addUser(User user) {
		users.put(user.getUsername(), user);
		csvWriter.write(user.toString());
	}
	

	public void updateUser(User user) throws ParseException {
		users = loadUsers();
		users.remove(user.getUsername());
		csvWriter.rewrite(user.toString());
		for(User current_user : users.values()) {
			csvWriter.write(current_user.toString());
		}
		users.put(user.getUsername(), user);
	}
	
	public void deleteUser(String id) throws ParseException {
		users = loadUsers();
		users.get(id).setIsDeleted(true);
		csvWriter.clearFile();
		
		for (User u : users.values()) {
			csvWriter.write(u.toString());
		}
	}
	

	private HashMap<String, User> loadUsers() throws ParseException {
		HashMap<String, User> users = new HashMap<>();
		DateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
		
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			Date date = format.parse(strings[5]);
			User user = new User(strings[0], strings[1], strings[2], strings[3], strings[4], date, Role.valueOf(strings[6]), Boolean.parseBoolean(strings[7]), Boolean.parseBoolean(strings[8]));
			users.put(strings[0], user);
		}
		
		return users;
	}
	
}
