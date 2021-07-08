package services;

import java.util.Collection;

import beans.Comment;
import beans.CommentStatus;
import dao.CommentDAO;

public class CommentService {
	private CommentDAO commentDAO;
	
	public CommentService() {
		commentDAO = new CommentDAO();
	}
	
	public void addComment(Comment comment) {
		comment.setId(commentDAO.generateId());
		comment.setStatus(CommentStatus.waitingForApproval);	
		commentDAO.addComment(comment);
	}
	
	public Collection<Comment> getAll(Integer restaurantId){
		return commentDAO.getAll(restaurantId);
	}
	
	public void updateComment(Integer id, Comment comment) {
		commentDAO.updateComment(id, comment);
	}
	
	public void deleteComment(Integer id) {
		commentDAO.deleteComment(id);
	}
}
