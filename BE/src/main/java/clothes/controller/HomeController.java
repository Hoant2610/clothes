package clothes.controller;

import java.util.List;

import clothes.entity.Clothes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import clothes.service.*;
@RestController
@RequestMapping("/home")
@CrossOrigin(origins ="*")
public class HomeController {
	@Autowired
	private ClothesService clothesService;
//	@GetMapping("/list")
//	public List<Clothes> getListClothes() {
//		return clothesService.getAllClothes();
//	}
	@GetMapping("/list/{nameClothes}")
	public Clothes getClothes(@PathVariable String nameClothes){
		return clothesService.getClothesByName(nameClothes);
	}
	@GetMapping("/list")
	public ResponseEntity<Page<Clothes>> getClothesPage(Pageable pageable) {
		List<Clothes> clothesList = clothesService.getAllClothes();
		Page<Clothes> clothesPage = clothesService.getClothesPage(clothesList, pageable);
		return ResponseEntity.ok(clothesPage);
	}
}
