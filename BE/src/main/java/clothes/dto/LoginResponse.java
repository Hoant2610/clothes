package clothes.dto;

public class LoginResponse {
	private String jwtToken;
	private String role;
	private int id;
	private int isEnable;
	private String username;
	public LoginResponse(String jwtToken,int id,String role, int isEnable, String username) {
		this.id = id;
		this.username = username;
		this.role = role;
		this.jwtToken = jwtToken;
		this.isEnable = isEnable;
	}
	public String getJwtToken() {
		return jwtToken;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public int getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(int isEnable) {
		this.isEnable = isEnable;
	}
}
