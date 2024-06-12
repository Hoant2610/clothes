package clothes.controller;

import clothes.entity.Category;
import clothes.entity.Clothes;
import clothes.entity.Color;
import clothes.entity.Size;
import clothes.repository.ClothesRepository;
import clothes.service.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class ClothesController {
    @Autowired
    private ClothesService clothesService;
    @GetMapping("/listclothes")
    public ResponseEntity<Page<Clothes>> getClothesPage(Pageable pageable) {
        List<Clothes> clothesList = clothesService.getAllClothes();
        Page<Clothes> clothesPage = clothesService.getClothesPage(clothesList, pageable);
        return ResponseEntity.ok(clothesPage);
    }
    @GetMapping("/categories")
    public List<Category> getListCategory(){
        return clothesService.getAllCategory();
    }

    @GetMapping("/listclothes/{id}")
    public Clothes getClothes(@PathVariable int id){
        return clothesService.getClothesById(id);
    }
    @GetMapping("/color/{idClothes}/{idColor}")
    public Color getColorClothes(@PathVariable int idClothes, @PathVariable int idColor){
        return clothesService.getColorClothesById(idClothes,idColor);
    }
    @GetMapping("/size/{idClothes}/{idSize}")
    public Size getSizeClothes(@PathVariable int idClothes, @PathVariable int idSize){
        return clothesService.getSizeClothesById(idClothes,idSize);
    }
    @PutMapping("/listclothes/{id}")
    public ResponseEntity<?> updateClothes(@PathVariable int id,@RequestBody Clothes clothes){
        return clothesService.updateClothesById(id,clothes);
    }
    @PutMapping("/color/{idClothes}/{idColor}")
    public ResponseEntity<?> updateColorClothes(@PathVariable int idClothes,@PathVariable int idColor,@RequestBody Color color){
        return clothesService.updateColorClothesById(idClothes,idColor,color);
    }
    @PutMapping("/size/{idClothes}/{idSize}")
    public ResponseEntity<?> updateSizeClothes(@PathVariable int idClothes,@PathVariable int idSize,@RequestBody Size size){
        return clothesService.updateSizeClothesById(idClothes,idSize,size);
    }
    @PostMapping("/createclothes")
    public ResponseEntity<?> createClothes(@RequestBody Clothes clothes){
        return clothesService.saveClothes(clothes);
    }
    @PostMapping("/createcolor/{idClothes}")
    public ResponseEntity<?> createColor(@RequestBody Color[] colors,@PathVariable int idClothes){
        return clothesService.saveColor(colors,idClothes);
    }
    @PostMapping("/createsize/{idClothes}")
    public ResponseEntity<?> createSize(@RequestBody Size[] sizes,@PathVariable int idClothes){
        return clothesService.saveSize(sizes,idClothes);
    }

}
