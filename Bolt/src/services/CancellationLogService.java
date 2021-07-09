package services;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import beans.CancellationLog;
import beans.User;
import dao.CancellationLogDAO;
import dao.UserDAO;

public class CancellationLogService {
	private static final Integer SPAM_TRESHOLD = 5;
	private UserDAO userDAO;
	private CancellationLogDAO cancellationLogDAO;
	
	public CancellationLogService() throws ParseException {
		userDAO = new UserDAO();
		cancellationLogDAO = new CancellationLogDAO();
	}
	
	public List<User> getSpammers(){
		List<User> users = new ArrayList<>();
		HashMap<String, List<CancellationLog>> logs = cancellationLogDAO.getCustomersLogs();
		for(Entry<String, List<CancellationLog>> log : logs.entrySet()) {
			if(checkForSpamBehaviour(log.getValue())) {
				User user = userDAO.findUser(log.getKey());
				if(user != null) {
					users.add(user);
				}				
			}
		}
		return users;
	}

	private boolean checkForSpamBehaviour(List<CancellationLog> logs) {
		if(logs.size() > SPAM_TRESHOLD) {
			for(CancellationLog log : logs) {
				Long count = logs.stream()
								.filter(l -> !l.getId().equals(log.getId()) && inMonthRange(log.getDate(), l.getDate()))
								.collect(Collectors.counting());
				if(count >= SPAM_TRESHOLD) {
					return true;
				}
			}
		}
		return false;
	}
	
	private boolean inMonthRange(Date startDate, Date testDate) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(startDate);
		cal.add(Calendar.MONTH, 1);
		Date endDate = cal.getTime();
		
		return !(testDate.before(startDate) || testDate.after(endDate));
	}
	
}
