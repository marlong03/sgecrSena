package com.sgecr.model;


import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
@Entity
@Table(name = "insumos")
public class Insumo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idinsumo;
    @Column
    private String nombreinsumo;
    @Column
    private int cantidadinsumo;
    @Column
    private String unidadinsumo;
    @Column
    private int valortotalinsumo;
    @Column
    @Temporal(TemporalType.DATE)    
    @DateTimeFormat(iso = ISO.DATE)
    private Date fechaingreso;
    @Column
    private String estadoinsumo;
    @Column
    private int valorunitarioinsumo;
    @Column
    private int categoriainsumos_idcategoriainsumos;
    public Insumo() {
    }
    public Insumo(int idinsumo, String nombreinsumo, int cantidadinsumo, String unidadinsumo, int valortotalinsumo,
            Date fechaingreso, String estadoinsumo, int categoriainsumos_idcategoriainsumos, int valorunitarioinsumo) {
        this.idinsumo = idinsumo;
        this.nombreinsumo = nombreinsumo;
        this.cantidadinsumo = cantidadinsumo;
        this.unidadinsumo = unidadinsumo;
        this.valortotalinsumo = valortotalinsumo;
        this.fechaingreso = fechaingreso;
        this.estadoinsumo = estadoinsumo;
        this.categoriainsumos_idcategoriainsumos = categoriainsumos_idcategoriainsumos;
        this.valorunitarioinsumo = valorunitarioinsumo;
    }
    public int getIdinsumo() {
        return idinsumo;
    }
    public void setIdinsumo(int idinsumo) {
        this.idinsumo = idinsumo;
    }
    public String getNombreinsumo() {
        return nombreinsumo;
    }
    public void setNombreinsumo(String nombreinsumo) {
        this.nombreinsumo = nombreinsumo;
    }
    public int getCantidadinsumo() {
        return cantidadinsumo;
    }
    public void setCantidadinsumo(int cantidadinsumo) {
        this.cantidadinsumo = cantidadinsumo;
    }
    public String getUnidadinsumo() {
        return unidadinsumo;
    }
    public void setUnidadinsumo(String unidadinsumo) {
        this.unidadinsumo = unidadinsumo;
    }
    public int getValortotalinsumo() {
        return valortotalinsumo;
    }
    public void setValortotalinsumo(int valortotalinsumo) {
        this.valortotalinsumo = valortotalinsumo;
    }
    public Date getFechaingresoinsumo() {
        return fechaingreso;
    }
    public void setFechaingresoinsumo(Date fechaingreso) {
        this.fechaingreso = fechaingreso;
    }
    public String getEstadoinsumo() {
        return estadoinsumo;
    }
    public void setEstadoinsumo(String estadoinsumo) {
        this.estadoinsumo = estadoinsumo;
    }
    public int getcategoriainsumos_idcategoriainsumos() {
        return categoriainsumos_idcategoriainsumos;
    }
    public void setcategoriainsumos_idcategoriainsumos(int categoriainsumos_idcategoriainsumos) {
        this.categoriainsumos_idcategoriainsumos = categoriainsumos_idcategoriainsumos;
    }
    public int getValorunitarioinsumo() {
        return valorunitarioinsumo;
    }
    public void setValorunitarioinsumo(int valorunitarioinsumo) {
        this.valorunitarioinsumo = valorunitarioinsumo;
    }
}
