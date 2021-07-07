package services;

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
}
