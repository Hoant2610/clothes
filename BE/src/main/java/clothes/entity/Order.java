package clothes.entity;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name="order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
//voucher?
    @OneToOne
    @JoinColumn(name = "id_payment", referencedColumnName = "id")
    private Payment payment;
    @OneToOne
    @JoinColumn(name = "id_shipment", referencedColumnName = "id")
    private Shipment shipment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Shipment getShipment() {
        return shipment;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }
}
