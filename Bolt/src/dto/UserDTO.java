package dto;

import java.util.Date;

import beans.CustomerType;
import beans.Role;

public class UserDTO {
	private String username;
	private String name;
	private String surname;
	private String gender;
	private Date dateOfBirth;
	private Role role;
	private Boolean isBlocked;
	private Boolean isDeleted;
	private CustomerType customerType;
	private int points;
	
	public UserDTO() {
		super();
	}

	public UserDTO(String username, String name, String surname, String gender, Date dateOfBirth, Role role,
			Boolean isBlocked, Boolean isDeleted) {
		super();
		this.username = username;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.isBlocked = isBlocked;
		this.isDeleted = isDeleted;
	}

	public UserDTO(String username, String name, String surname, String gender, Date dateOfBirth, Role role,
			Boolean isBlocked, Boolean isDeleted, CustomerType customerType, int points) {
		super();
		this.username = username;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.isBlocked = isBlocked;
		this.isDeleted = isDeleted;
		this.customerType = customerType;
		this.points = points;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}
	
	
}
