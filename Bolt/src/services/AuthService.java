package services;

import java.security.Key;
import java.util.Date;

import beans.User;
import io.jsonwebtoken.Jwts;
import spark.Request;

public class AuthService {
	private Key key;
	
	public AuthService(Key key) {
		this.key = key;
	}
	
	public Boolean isAuthorized(Request req) {
		String auth = req.headers("Authorization");
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
			    Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
			    return true;
			    
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
		return false;
	}
	
	public String buildToken(User user) {
		return Jwts.builder()
				.setSubject(user.getUsername())
				.claim("Role", user.getRole())
				.setExpiration(new Date(new Date().getTime() + 360000*10L))
				.signWith(key)
				.compact();
	}
}
