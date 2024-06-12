package clothes.service;

import clothes.dto.CartRequest;
import clothes.dto.CartResponse;
import clothes.entity.*;
import clothes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ClothesRepository clothesRepository;
    public ResponseEntity<?> addToCart(CartRequest cartRequest){
        User user = userRepository.findByUsername(cartRequest.getUsername());
        Clothes clothes = clothesRepository.findById(cartRequest.getIdClothes()).get();
        Color color = colorRepository.findByColorAndClothes(cartRequest.getColorValue(),clothes);
        Size size = sizeRepository.findBySizeAndClothes(cartRequest.getSizeValue(),clothes) ;
        Cart cart = cartRepository.findByUserAndClothesAndColorAndSize(user,clothes,color,size);
        if(cart != null){
            int updateQuantity = cart.getQuantity() + cartRequest.getQuantity();
            cart.setQuantity(updateQuantity);
            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        }
        else{
            Cart newCart = new Cart(user,clothes,color,size,cartRequest.getQuantity());
            cartRepository.save(newCart);
            newCart.setId(newCart.getId());
            return ResponseEntity.ok(cart);
        }
    }

    public ResponseEntity<?> increaseItem(int idCart){
        Cart cart = cartRepository.findById(idCart).get();
        cart.setQuantity(cart.getQuantity()+1);
        return ResponseEntity.ok(cartRepository.save(cart));
    }
    public ResponseEntity<?> decreaseItem(int idCart){
        Cart cart = cartRepository.findById(idCart).get();
        if(cart.getQuantity() == 1){
            cartRepository.delete(cart);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            cart.setQuantity(cart.getQuantity()-1);
            return ResponseEntity.ok(cartRepository.save(cart));
        }
    }
    public ResponseEntity<?> removeFromCart(User user, Clothes clothes){
        return null;
    }

    public ResponseEntity<?> getAllFromCart(User user){
        List<Cart> carts = cartRepository.findByUser(user);
        List<CartResponse> cartResponses = new ArrayList<>();
        for(Cart cart : carts){
            CartResponse cartResponse = new CartResponse();
            cartResponse.setId(cart.getId());
            cartResponse.setClothes(cart.getClothes());
            cartResponse.setColor(cart.getColor());
            cartResponse.setSize(cart.getSize());
            cartResponse.setQuantity(cart.getQuantity());
            cartResponses.add(cartResponse);
        }
        return ResponseEntity.ok(cartResponses);
    }
}
