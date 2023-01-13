package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "productos")
public class Producto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idproducto;

    @Column
    private String nombreproducto;
    @Column
    private String descripcionproducto;
    @Column
    private String ingredientesproducto;
    @Column
    private int valorproducto;
    @Column
    private int fk_categoriaproductos;
    public Producto() {
    }
    public Producto(int idproducto, String nombreproducto, int valorproducto,String descripcionproducto,String ingredientesproducto, int fk_categoriaproductos) {
        this.idproducto = idproducto;
        this.nombreproducto = nombreproducto;
        this.descripcionproducto = descripcionproducto;
        this.ingredientesproducto = ingredientesproducto;
        this.valorproducto = valorproducto;
        this.fk_categoriaproductos = fk_categoriaproductos;

    }
    public int getfk_categoriaproductos() {
        return fk_categoriaproductos;
    }
    public void setfk_categoriaproductos(int fk_categoriaproductos) {
        this.fk_categoriaproductos = fk_categoriaproductos;
    }
    public String getDescripcionproducto() {
        return descripcionproducto;
    }
    public void setDescripcionproducto(String descripcionproducto) {
        this.descripcionproducto = descripcionproducto;
    }
    public String getIngredientesproducto() {
        return ingredientesproducto;
    }
    public void setIngredientesproducto(String ingredientesproducto) {
        this.ingredientesproducto = ingredientesproducto;
    }
    public int getIdproducto() {
        return idproducto;
    }
    public void setIdproducto(int idproducto) {
        this.idproducto = idproducto;
    }
    public String getNombreproducto() {
        return nombreproducto;
    }
    public void setNombreproducto(String nombreproducto) {
        this.nombreproducto = nombreproducto;
    }
    public int getValorproducto() {
        return valorproducto;
    }
    public void setValorproducto(int valorproducto) {
        this.valorproducto = valorproducto;
    }
}
