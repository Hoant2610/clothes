package clothes.controller;

import clothes.dto.CartRequest;
import clothes.entity.User;
import clothes.repository.CartRepository;
import clothes.repository.UserRepository;
import clothes.service.CartService;
import clothes.service.ClothesService;
import clothes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart/")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private ClothesService clothesService;
    @GetMapping("/{username}")
    public ResponseEntity<?> getAllFromCart(@PathVariable String username){
        return cartService.getAllFromCart(userService.findUserByUsername(username));
    }
    @PostMapping()
    public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest){
        return cartService.addToCart(cartRequest);
    }
    @PutMapping("increase/{idCart}")
    public ResponseEntity<?> increaseItem(@PathVariable int idCart){
        return cartService.increaseItem(idCart);
    }
    @PutMapping("decrease/{idCart}")
    public ResponseEntity<?> decreaseItem(@PathVariable int idCart){
        return cartService.decreaseItem(idCart);
    }
}
