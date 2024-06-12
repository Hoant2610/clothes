package clothes.repository;

import clothes.entity.Clothes;
import clothes.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size,Integer> {
    Size findByClothesAndId(Clothes clothes, int idSize);
    Size findBySizeAndClothes(String  size,Clothes clothes);
}
