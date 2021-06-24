package dao;

import java.io.FileWriter;
import java.io.IOException;

public class CSVWriter {
	private String fileName;
	
	public CSVWriter(String fileName) {
		this.fileName = fileName;
	}
	
	public void write(String data) {
		try(FileWriter csvWriter = new FileWriter(fileName, true)) {
			csvWriter.write(data + "\n");
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	public void rewrite(String data) {
		try(FileWriter csvWriter = new FileWriter(fileName, false)) {
			csvWriter.write(data + "\n");
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
