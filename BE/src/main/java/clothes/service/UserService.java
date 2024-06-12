package clothes.service;

import clothes.dto.ChangePassRequest;
import clothes.dto.ChangePassResponse;
import clothes.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import clothes.entity.User;
import clothes.repository.UserRepository;

import java.util.*;

@Service
public class UserService  {
	@Autowired
	private UserRepository userRepository;
	private final AuthenticationManager authenticationManager;
	public UserService(UserRepository userRepository, AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
	}
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CartRepository cartRepository;
	public User findUserByUsername(String username) throws UsernameNotFoundException{
		return userRepository.findByUsername(username);
	}

	public List<User> getAllCustomer() {
		return (List<User>) userRepository.findAllByRole("customer");
	}
	public User getCustomerById(int id) {
		return userRepository.findById(id);
	}
	public void saveCustomer(User user){
		userRepository.save(user);
	}
	public ResponseEntity<?> createCustomer(User customer){
		User check = userRepository.findByUsername(customer.getUsername());
		if(check == null){
			String hashPassword = passwordEncoder.encode(customer.getPassword());
			customer.setPassword(hashPassword);
			userRepository.save(customer);
			customer.setId(customer.getId());
			return ResponseEntity.ok(customer);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create customer");
	}

	public List<User> getAllAdmin() {
		return (List<User>) userRepository.findAllByRole("admin");
	}
	public User getAdminById(int id) {
		return userRepository.findById(id);
	}
	public void saveAdmin(User user){
		userRepository.save(user);
	}
	public ResponseEntity<?> createAdmin(User admin){
		User check = userRepository.findByUsername(admin.getUsername());
		if(check == null){
			String hashPassword = passwordEncoder.encode(admin.getPassword());
			admin.setPassword(hashPassword);
			userRepository.save(admin);
			admin.setId(admin.getId());
			return ResponseEntity.ok(admin);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create admin");
	}
	public ResponseEntity<?> updateCustomer(String username,User updateUser){
		User oldUser = userRepository.findByUsername(username);
		oldUser.setEmail(updateUser.getEmail());
		oldUser.setTelephone(updateUser.getTelephone());
		oldUser.setAddress(updateUser.getAddress());
		return ResponseEntity.ok(userRepository.save(oldUser));
	}
	public ResponseEntity<?> changePassword(String username,ChangePassRequest changePassRequest){
		ChangePassResponse changePassResponse = new ChangePassResponse();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(username,changePassRequest.getOldPassword()));
					String newPaswordEndcode = passwordEncoder.encode(changePassRequest.getNewPassword());
					if(changePassRequest.getOldPassword().equals(changePassRequest.getNewPassword())){
						changePassResponse.setResponse("Mật khẩu mới không được trùng mật khẩu cũ!");
						return ResponseEntity.ok(changePassResponse);
					}
					User user = userRepository.findByUsername(username);
					user.setPassword(newPaswordEndcode);
					userRepository.save(user);
					changePassResponse.setResponse("Đổi mật khẩu thành công!");
					return ResponseEntity.ok(changePassResponse);
		} catch (AuthenticationException e) {
			System.out.println("Lỗi xác thực: " + e.getMessage());
			changePassResponse.setResponse("Mật khẩu không đúng!");
			return ResponseEntity.ok(changePassResponse);
		}
	}
}
