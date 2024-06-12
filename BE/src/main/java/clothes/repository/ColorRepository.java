package clothes.repository;

import clothes.entity.Clothes;
import clothes.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,Integer> {
    Color findByClothesAndId(Clothes clothes, int idColor);
    Color findByColorAndClothes(String  color,Clothes clothes);
}
