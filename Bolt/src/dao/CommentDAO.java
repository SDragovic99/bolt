package dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import beans.Comment;
import beans.CommentStatus;

public class CommentDAO {
	private CSVReader csvReader;
	private CSVWriter csvWriter;
	private String fileName = "data/comments.csv";
	private HashMap<Integer, Comment> comments;

	public CommentDAO() {
		this.csvReader = new CSVReader(fileName);
		this.csvWriter = new CSVWriter(fileName);
		this.comments = loadComments();
	}
	
	public Integer generateId() {
		return comments.size() + 1;
	}
	
	public Collection<Comment> getAll(){
		return comments.values();
	}
	
	public Collection<Comment> getAll(Integer restaurantId){
		return comments.values().stream()
				.filter(comment -> comment.getRestaurantId() == restaurantId)
				.collect(Collectors.toList());
	}
	
	public void addComment(Comment comment) {
		comments.put(comment.getId(), comment);
		csvWriter.write(comment.toString());
	}
	
	public void updateComment(Integer id, Comment comment) {
		comments.replace(id, comment);
		csvWriter.clearFile();
		
		for (Comment c : comments.values()) {
			csvWriter.write(c.toString());
		}
	}

	private HashMap<Integer, Comment> loadComments() {
		HashMap<Integer, Comment> comments = new HashMap<>();
		
		List<String[]> data = csvReader.read();
		for (String[] strings : data) {
			Comment comment = new Comment(Integer.parseInt(strings[0]), strings[1], Integer.parseInt(strings[2]), strings[3], 
					Integer.parseInt(strings[4]), CommentStatus.valueOf(strings[5]));
			comments.put(Integer.parseInt(strings[0]), comment);
		}
		
		return comments;
	}
}
