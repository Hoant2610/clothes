package clothes.dto;

import clothes.entity.Clothes;
import clothes.entity.Color;
import clothes.entity.Size;

public class CartResponse {
    private int id;
    private Clothes clothes;
    private Color color;
    private Size size;
    private int quantity;
    public Clothes getClothes() {
        return clothes;
    }
    public void setClothes(Clothes clothes) {
        this.clothes = clothes;
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
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
}
