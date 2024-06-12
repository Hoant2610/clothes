package clothes.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "color")
    private String color;
    @Column(name = "original_price")
    private float originalPrice;
    @Column(name = "selling_price")
    private float sellingPrice;
    @Column(name = "url_image")
    private String urlImage;

    @ManyToOne
    @JoinColumn(name = "id_clothes")
    private Clothes clothes;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public float getOriginalPrice() {
        return originalPrice;
    }
    public void setOriginalPrice(float originalPrice) {
        this.originalPrice = originalPrice;
    }
    public float getSellingPrice() {
        return sellingPrice;
    }
    public void setSellingPrice(float sellingPrice) {
        this.sellingPrice = sellingPrice;
    }
    public String getUrlImage() {
        return urlImage;
    }
    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public void setClothes(Clothes clothes) {
        this.clothes = clothes;
    }
}
