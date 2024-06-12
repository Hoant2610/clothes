package clothes.entity;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "clothes")
public class Clothes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
	@Column(name = "sold")
	private int sold;
	@Column(name = "is_enable")
	private int isEnable;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
	@OneToMany(mappedBy = "clothes", cascade = CascadeType.ALL
	)
	private List<Size> sizes ;
	@OneToMany(mappedBy = "clothes", cascade = CascadeType.ALL
	)
	private List<Color> colors ;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public List<Size> getSizes() {
		return sizes;
	}
	public void setSizes(List<Size> sizes) {
		this.sizes = sizes;
	}
	public List<Color> getColors() {
		return colors;
	}
	public void setColors(List<Color> colors) {
		this.colors = colors;
	}
	public int getSold() {
		return sold;
	}
	public void setSold(int sold) {
		this.sold = sold;
	}

	public int getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(int isEnable) {
		this.isEnable = isEnable;
	}
}
