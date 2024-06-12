package clothes.repository;

import clothes.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    Cart findByUserAndClothesAndColorAndSize(User user, Clothes clothes, Color color, Size size);
    List<Cart> findByUser(User user);
}
