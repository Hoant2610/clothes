package clothes.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import clothes.dto.RegisterDTO;
import clothes.service.AuthService;
import clothes.entity.*;
@RestController
@RequestMapping("/register")
@CrossOrigin("*")
public class RegisterController {
	private AuthService authService;
	
	public RegisterController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping
	public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO){
		User createdUser = authService.createUser(registerDTO);
		if (createdUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create customer");
        }
	}
}
