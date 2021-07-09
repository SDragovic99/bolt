package dao;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import beans.CancellationLog;

public class CancellationLogDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/cancellation-log.csv";
	private HashMap<Integer, CancellationLog> logs;
	
	public CancellationLogDAO() throws ParseException {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.logs = loadLogs();
	}
	
	public Collection<CancellationLog> getAll() throws ParseException{
		logs = loadLogs();
		return logs.values();
	}
	
	public HashMap<String, List<CancellationLog>> getCustomersLogs(){
		HashMap<String, List<CancellationLog>> logsForCustomer = new HashMap<>();
		
		for(Entry<Integer, CancellationLog> entry : logs.entrySet()) {
			String customerId = entry.getValue().getCustomerId();
			if(!logsForCustomer.containsKey(customerId)) {
				List<CancellationLog> allLogs = logs.values().stream()
													.filter(log -> log.getCustomerId().equals(customerId))
													.collect(Collectors.toList());
				logsForCustomer.put(customerId, allLogs);
			}
		}
		
		return logsForCustomer;				
	}
	
	public void addLog(CancellationLog log) {
		log.setId(logs.size() + 1);
		logs.put(log.getId(), log);
		csvWriter.write(log.toString());
	}

	private HashMap<Integer, CancellationLog> loadLogs() throws ParseException {
		HashMap<Integer, CancellationLog> logs = new HashMap<>();
		DateFormat format = new SimpleDateFormat("dd.MM.yyyy.");
		
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			Date date = format.parse(strings[2]);
			CancellationLog log = new CancellationLog(Integer.parseInt(strings[0]), strings[1], date, strings[3]);
			logs.put(Integer.parseInt(strings[0]), log);
		}
		
		return logs;		
	}
}
