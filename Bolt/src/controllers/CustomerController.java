package controllers;

import static spark.Spark.get;
import java.security.Key;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import beans.Customer;
import dto.UserDTO;
import services.AuthService;
import services.CustomerService;
import services.OrderService;

public class CustomerController {
	private AuthService authService;
	private CustomerService customerService;
	private OrderService orderService;
	private static Gson gson = new Gson();
	
	public CustomerController(Key key) throws ParseException {
		authService = new AuthService(key);
		customerService = new CustomerService();
		
		get("/customers/:restaurantId", (req, res) -> {
			res.type("application/json");
			Integer restaurantId = Integer.parseInt(req.params("restaurantId"));
					
			if (authService.isAuthorized(req)) {
				orderService = new OrderService();
				List<UserDTO> retVal = new ArrayList<>();
				List<String> customers = orderService.getCustomers(restaurantId);
				for (String id : customers) {
					Customer customer = customerService.getCustomer(id);
					retVal.add(mapToDTO(customer));
				}
				
				return gson.toJson(retVal);
			}
			
			res.status(403);
			return "Forbidden";
		});
	}
	
	private UserDTO mapToDTO(Customer customer) {
		return new UserDTO(customer.getUser().getUsername(), customer.getUser().getName(), customer.getUser().getSurname(), 
				customer.getUser().getGender(), customer.getUser().getDateOfBirth(), customer.getUser().getRole(), customer.getUser().getIsBlocked(),
				customer.getUser().getIsDeleted(), customer.getCustomerType(), customer.getPoints());

	}
}
