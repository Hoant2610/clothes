package clothes.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "size")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="size")
    private String size;
    @ManyToOne
    @JoinColumn(name = "id_clothes")
    private Clothes clothes;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getSize() {
        return size;
    }
    public void setSize(String size) {
        this.size = size;
    }

    public void setClothes(Clothes clothes) {
        this.clothes = clothes;
    }
}
