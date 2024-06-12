package clothes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import clothes.entity.*;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes,Integer>{
    Clothes findByName(String name);
}
