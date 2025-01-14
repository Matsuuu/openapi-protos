package org.acme;

import java.util.Optional;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Fruit extends PanacheEntity {

    public String name;
    public String description;

    public Fruit() {

    }

    public Fruit(String description, String name) {
        this.description = description;
        this.name = name;
    }

    public static Optional<Fruit> getFruitByName(String name) {
        return find("name", name).firstResultOptional();
    }

}
