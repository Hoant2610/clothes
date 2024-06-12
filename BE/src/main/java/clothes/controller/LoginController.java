package clothes.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.web.bind.annotation.*;

import clothes.dto.LoginRequest;
import clothes.dto.LoginResponse;
import clothes.entity.*;
import clothes.repository.UserRepository;
import clothes.service.UserDetailsServiceImpl;
import clothes.service.UserService;
import clothes.utils.JwtUtil;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class LoginController {

  private final AuthenticationManager authenticationManager;
  //	private UserDetailsServiceImpl userService;
  private final UserService userService;
  private JwtUtil jwtUtil;

  public LoginController(AuthenticationManager authenticationManager,
      UserService userService, JwtUtil jwtUtil) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  //	@PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
              loginRequest.getPassword())
      );
    } catch (AuthenticationException e) {
      System.out.println("Lỗi xác thực: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    User user;
    try {
      user = userService.findUserByUsername(loginRequest.getUsername());
    } catch (UsernameNotFoundException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    String jwt = jwtUtil.generateToken(user.getUsername());
    return ResponseEntity.ok(
        new LoginResponse(jwt, user.getId(), user.getRole(), user.getIsEnable(),
            user.getUsername()));
  }
}
