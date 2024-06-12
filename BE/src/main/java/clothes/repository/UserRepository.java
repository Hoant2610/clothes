package clothes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import clothes.entity.*;

import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Integer>{
	User findByUsername(String username);
	User findById(int id);
	List<User> findAllByRole(String role);
}
