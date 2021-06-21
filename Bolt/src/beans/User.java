package beans;

import java.util.ArrayList;
import java.util.List;

public class User {
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private String dateOfBirth;
	private Role role;
	
	public User() {
		super();
	}
	
	public User(String username, String password, String name, String surname, String dateOfBirth, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public List<String> stringify(){
		List<String> stringified = new ArrayList<>();
		stringified.add(this.username);
		stringified.add(this.password);
		stringified.add(this.name);
		stringified.add(this.surname);
		stringified.add(this.gender);
		stringified.add(this.dateOfBirth);
		stringified.add("customer"); //TODO change to enum
		return stringified;
	}
}
