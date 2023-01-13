package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "categoriainsumos")
public class CategoriaInsumo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcategoriainsumos;

    @Column
    private String nombrecategoria;

    public CategoriaInsumo() {
    }

    public CategoriaInsumo(int idcategoriainsumos, String nombrecategoria) {
        this.idcategoriainsumos = idcategoriainsumos;
        this.nombrecategoria = nombrecategoria;
    }

    public int getIdcategoriainsumos() {
        return idcategoriainsumos;
    }

    public void setIdcategoriainsumos(int idcategoriainsumos) {
        this.idcategoriainsumos = idcategoriainsumos;
    }

    public String getNombrecategoria() {
        return nombrecategoria;
    }

    public void setNombrecategoria(String nombrecategoria) {
        this.nombrecategoria = nombrecategoria;
    }
   
}
