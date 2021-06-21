package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CSVWriter {
	private String fileName;
	
	public CSVWriter(String fileName) {
		this.fileName = fileName;
	}
	
	public void write(List<String> data) {
		try(FileWriter csvWriter = new FileWriter(fileName, true)) {
			csvWriter.write(String.join(",", data) + "\n");
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
