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
@Table(name = "ventas")
public class Venta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idventa;

    @Column
    @Temporal(TemporalType.DATE)    
    @DateTimeFormat(iso = ISO.DATE)
    private Date fechaventa;
    @Column
    private int totalventa;
    @Column
    private int usuarios_idusuario;
    public Venta() {
    }
    public Venta(int idventa, Date fechaventa, int totalventa, int usuarios_idusuario) {
        this.idventa = idventa;
        this.fechaventa = fechaventa;
        this.totalventa = totalventa;
        this.usuarios_idusuario = usuarios_idusuario;
    }
    public int getidventa() {
        return idventa;
    }
    public void setidventa(int idventa) {
        this.idventa = idventa;
    }
    public Date getFechaventa() {
        return fechaventa;
    }
    public void setFechaventa(Date fechaventa) {
        this.fechaventa = fechaventa;
    }
    public int getTotalventa() {
        return totalventa;
    }
    public void setTotalventa(int totalventa) {
        this.totalventa = totalventa;
    }
    public int getUsuario_idusuario() {
        return usuarios_idusuario;
    }
    public void setUsuario_idusuario(int usuarios_idusuario) {
        this.usuarios_idusuario = usuarios_idusuario;
    }
    
}
