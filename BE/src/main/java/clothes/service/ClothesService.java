package clothes.service;

import java.util.*;

import clothes.entity.Category;
import clothes.entity.Clothes;
import clothes.entity.Color;
import clothes.entity.Size;
import clothes.repository.CategoryRepository;
import clothes.repository.ColorRepository;
import clothes.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import clothes.repository.ClothesRepository;

@Service
public class ClothesService {
	@Autowired 
	private ClothesRepository clothesRepository;
	@Autowired
	private ColorRepository colorRepository;
	@Autowired
	private SizeRepository sizeRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	public List<Clothes> getAllClothes() {
		return clothesRepository.findAll();
	}
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}
	public Clothes getClothesById(int id){
		return  clothesRepository.findById(id).get();
	}
	public Clothes getClothesByName(String nameClothes){
		return  clothesRepository.findByName(nameClothes);
	}
	public Color getColorClothesById(int idClothes, int idColor){
		return colorRepository.findByClothesAndId(clothesRepository.findById(idClothes).get(),idColor);
	}
	public Size getSizeClothesById(int idClothes, int idSize){
		return sizeRepository.findByClothesAndId(clothesRepository.findById(idClothes).get(),idSize);
	}
	public ResponseEntity<?> updateClothesById(int id, Clothes clothes){
		Clothes old = clothesRepository.findById(id).get();
		if(old.getName().equals(clothes.getName()) != true && clothesRepository.findByName(clothes.getName()) != null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name is exist");
		}
		old.setName(clothes.getName());
		old.setDescription(clothes.getDescription());
		old.setSold(clothes.getSold());
		old.setIsEnable(clothes.getIsEnable());
		return ResponseEntity.ok(clothesRepository.save(old));
	}
	public ResponseEntity<?> updateColorClothesById(int idClothes, int idColor, Color color) {
		Color old = colorRepository.findByClothesAndId(clothesRepository.findById(idClothes).get(),idColor);
		if(old.getColor().equals(color.getColor()) != true && colorRepository.findByColorAndClothes(color.getColor(),clothesRepository.findById(idClothes).get()) != null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Color is exist");
		}
		old.setColor(color.getColor());
		old.setUrlImage(color.getUrlImage());
		old.setSellingPrice(color.getSellingPrice());
		old.setOriginalPrice(color.getOriginalPrice());
		return ResponseEntity.ok(colorRepository.save(old));
	}
	public ResponseEntity<?> updateSizeClothesById(int idClothes, int idSize, Size size) {
		Size old = sizeRepository.findByClothesAndId(clothesRepository.findById(idClothes).get(),idSize);
		if(old.getSize().equals(size.getSize()) != true && sizeRepository.findBySizeAndClothes(size.getSize(),clothesRepository.findById(idClothes).get()) != null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Size is exist");
		}
		old.setSize(size.getSize());
		return ResponseEntity.ok(sizeRepository.save(old));
	}
	public ResponseEntity<?> saveClothes(Clothes clothes){
		if(clothesRepository.findByName(clothes.getName()) != null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name clothes is exist");
		}
		else{
//			Lay ra cac mau va luu
			List<Color> colors = clothes.getColors();
			for(Color i : colors){
				i.setClothes(clothes);
			}
			List<Size> sizes = clothes.getSizes();
			for(Size i : sizes){
				i.setClothes(clothes);
			}
			clothesRepository.save(clothes);
			clothes.setId(clothes.getId());
			return ResponseEntity.ok(clothes);
		}
	}
	public ResponseEntity<?> saveColor(Color[] colors,int idClothes){
		Clothes clothes = clothesRepository.findById(idClothes).get();
		List<Color> tmp = clothes.getColors();
		for(Color i : tmp){
			for(Color j : colors){
				if(i.getColor().equals(j.getColor()) == true)
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name color is exist");
			}
		}
		for(Color i : colors){
			i.setClothes(clothes);
			colorRepository.save(i);
			i.setId(i.getId());
		}
		return ResponseEntity.ok(colors);
	}
	public ResponseEntity<?> saveSize(Size[] sizes,int idClothes){
		Clothes clothes = clothesRepository.findById(idClothes).get();
		List<Size> tmp = clothes.getSizes();
		for(Size i : tmp){
			for(Size j : sizes){
				if(i.getSize().equals(j.getSize()) == true)
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name size is exist");
			}
		}
		for(Size i : sizes){
			i.setClothes(clothes);
			sizeRepository.save(i);
			i.setId(i.getId());
		}
		return ResponseEntity.ok(sizes);
	}
	public Page<Clothes> getClothesPage(List<Clothes> clothesList, Pageable pageable) {
		int pageSize = pageable.getPageSize();
		int currentPage = pageable.getPageNumber();
		int startItem = currentPage * pageSize;

		List<Clothes> pageList;

		if (clothesList.size() < startItem) {
			pageList = List.of();
		} else {
			int toIndex = Math.min(startItem + pageSize, clothesList.size());
			pageList = clothesList.subList(startItem, toIndex);
		}

		return new PageImpl<>(pageList, pageable, clothesList.size());
	}
}
