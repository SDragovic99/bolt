package dao;

import java.io.File;
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
	
	public void clearFile() {
		File file = new File(fileName);
		if(file.exists() && file.isFile()) {
			file.delete();
		}
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
