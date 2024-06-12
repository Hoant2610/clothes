package clothes.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user")
	private User user;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_clothes")
	private Clothes clothes;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_color")
	private Color color;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_size")
	private Size size;
	@Column(name = "quantity")
	private int quantity;
	public Cart(){

	}
	public Cart( User user, Clothes clothes, Color color, Size size, int quantity) {
		this.user = user;
		this.clothes = clothes;
		this.color = color;
		this.size = size;
		this.quantity = quantity;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public Clothes getClothes() {
		return clothes;
	}
	public void setClothes(Clothes clothes) {
		this.clothes = clothes;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Color getColor() {
		return color;
	}
	public void setColor(Color color) {
		this.color = color;
	}
	public Size getSize() {
		return size;
	}
	public void setSize(Size size) {
		this.size = size;
	}
}
