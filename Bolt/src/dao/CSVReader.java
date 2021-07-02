package dao;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CSVReader {
	private String fileName;
	
	public CSVReader(String fileName) {
		this.fileName = fileName;
	}
	
	public List<String[]> read() {
		List<String[]> dataset = new ArrayList<>();
		String line = "";  
		String separator = ","; 
		
		try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {   
			while ((line = br.readLine()) != null) {  
				dataset.add(line.split(separator)); 
			}  
		}   
		catch (IOException e) {  
			e.printStackTrace();  
		}  
		
		return dataset;
	}
	
	public List<String> readList(String string) {
		List<String> dataset = new ArrayList<>();
		String separator = ";"; 	
		String[] data = string.split(separator); 
		
		for (String s : data) {
			dataset.add(s);
		}
		return dataset;
	}
}
