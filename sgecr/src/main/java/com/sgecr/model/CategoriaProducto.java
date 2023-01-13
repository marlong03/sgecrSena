package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "categoriaproductos")
public class CategoriaProducto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcategoriaproducto;

    @Column
    private String nombrecategoriaproducto;

    public CategoriaProducto() {
    }

    public CategoriaProducto(int idcategoriaproducto, String nombrecategoriaproducto) {
        this.idcategoriaproducto = idcategoriaproducto;
        this.nombrecategoriaproducto = nombrecategoriaproducto;
    }

    public int getidCategoriaproducto() {
        return idcategoriaproducto;
    }

    public void setidCategoriaproducto(int idcategoriaproducto) {
        this.idcategoriaproducto = idcategoriaproducto;
    }

    public String getNombreCategoriaProducto() {
        return nombrecategoriaproducto;
    }

    public void setNombreCategoriaProducto(String nombrecategoriaproducto) {
        this.nombrecategoriaproducto = nombrecategoriaproducto;
    }
   
}
