package clothes.service;

import clothes.entity.Cart;
import clothes.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.beans.BeanUtils;
import clothes.dto.RegisterDTO;
import clothes.entity.User;
import clothes.repository.UserRepository;

@Component
@Lazy
public class AuthService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	public User createUser(RegisterDTO registerDTO) {
//		check user exist
		if(userRepository.findByUsername(registerDTO.getUsername()) != null) return null;
		else {
			User user = new User();
			BeanUtils.copyProperties(registerDTO,user);
			user.setRole("customer");
			user.setIsEnable(1);
			String hashPassword = passwordEncoder.encode(registerDTO.getPassword());
			user.setPassword(hashPassword);
			userRepository.save(user);
			user.setId(userRepository.findByUsername(user.getUsername()).getId());
			return user;
		}
	}
}
