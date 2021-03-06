package beans;

import java.text.SimpleDateFormat;
import java.util.Date;

public class User {
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private Date dateOfBirth;
	private Role role;
	private Boolean isBlocked;
	private Boolean isDeleted;
	
	public User() {
		super();
	}
	
	public User(String username, String password, String name, String surname, String gender, Date dateOfBirth, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.isBlocked = false;
		this.isDeleted = false;
	}
	
	public User(String username, String password, String name, String surname, String gender, Date dateOfBirth,
			Role role, Boolean isBlocked, Boolean isDeleted) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.isBlocked = isBlocked;
		this.isDeleted = isDeleted;
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

	@Override
    public String toString() {
        return username + "," + password + "," + name + "," + surname + "," + gender + "," + getDateString() + "," + role + "," + isBlocked + "," + isDeleted;
    }
	
	private String getDateString() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
		return formatter.format(dateOfBirth);
	}
}
