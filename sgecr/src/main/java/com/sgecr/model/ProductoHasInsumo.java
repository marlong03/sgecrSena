package com.sgecr.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="productos_has_insumos")
public class ProductoHasInsumo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fk_idinsumos;

    @Column
    private int fk_idproductos;

    public ProductoHasInsumo() {
    }

    public ProductoHasInsumo(int fk_idinsumos, int fk_idproductos) {
        this.fk_idinsumos = fk_idinsumos;
        this.fk_idproductos = fk_idproductos;
    }

    public int getfk_idinsumos() {
        return fk_idinsumos;
    }

    public void setfk_idinsumos(int fk_idinsumos) {
        this.fk_idproductos = fk_idinsumos;
    }

    public int getfk_idproductos() {
        return fk_idproductos;
    }

    public void setfk_idproductos(int fk_idproductos) {
        this.fk_idproductos= fk_idproductos;
    }

}
