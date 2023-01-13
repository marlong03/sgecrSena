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
@Table(name = "pedidos")
public class Pedido implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpedido;
    @Column
    private String referenciapedido; 
    @Column
    private String descripcionpedido;
    @Column
    private String telefonopedido;
    @Column
    private String destinopedido;
    @Column
    private String detalledestinopedido;
    @Column
    private int valorpedido;
    @Column
    private String observacionpedido;
    @Column
    private int fk_idusuario;
    @Column
    private String estadopedido;
    @Temporal(TemporalType.DATE)    
    @DateTimeFormat(iso = ISO.DATE)
    @Column
    private Date fechapedido;
    @Column
    private int fk_iddomiciliario;
   

    public Pedido() {
    }
    
    public Pedido(int idpedido, String referenciapedido, String descripcionpedido,String telefonopedido,
            String destinopedido,
            String detalledestinopedido, int valorpedido, String observacionpedido, int fk_idusuario,
            String estadopedido, Date fechapedido, int fk_iddomiciliario) {
        this.idpedido = idpedido;
        this.referenciapedido = referenciapedido;
        this.descripcionpedido = descripcionpedido;
        this.telefonopedido = telefonopedido;
        this.destinopedido = destinopedido;
        this.detalledestinopedido = detalledestinopedido;
        this.valorpedido = valorpedido;
        this.observacionpedido = observacionpedido;
        this.fk_idusuario = fk_idusuario;
        this.estadopedido = estadopedido;
        this.fechapedido = fechapedido;
        this.fk_iddomiciliario = fk_iddomiciliario;
    }

    public int getIdpedido() {
        return idpedido;
    }
    public void setIdpedido(int idpedido) {
        this.idpedido = idpedido;
    }
    public String getReferenciapedido() {
        return referenciapedido;
    }
    public void setReferenciapedido(String referenciapedido) {
        this.referenciapedido = referenciapedido;
    }
    public String getDescripcionpedido() {
        return descripcionpedido;
    }
    public void setDescripcionpedido(String descripcionpedido) {
        this.descripcionpedido = descripcionpedido;
    }
    
    public String getTelefonopedido() {
        return telefonopedido;
    }

    public void setTelefonopedido(String telefonopedido) {
        this.telefonopedido = telefonopedido;
    }
    public String getDestinopedido() {
        return destinopedido;
    }
    public void setDestinopedido(String destinopedido) {
        this.destinopedido = destinopedido;
    }
    public String getDetalledestinopedido() {
        return detalledestinopedido;
    }
    public void setDetalledestinopedido(String detalledestinopedido) {
        this.detalledestinopedido = detalledestinopedido;
    }
    public int getValorpedido() {
        return valorpedido;
    }
    public void setValorpedido(int valorpedido) {
        this.valorpedido = valorpedido;
    }
    public String getObservacionpedido() {
        return observacionpedido;
    }
    public void setObservacionpedido(String observacionpedido) {
        this.observacionpedido = observacionpedido;
    }
    public int getFk_idusuario() {
        return fk_idusuario;
    }
    public void setFk_idusuario(int fk_idusuario) {
        this.fk_idusuario = fk_idusuario;
    }
    public String getEstadopedido() {
        return estadopedido;
    }
    public void setEstadopedido(String estadopedido) {
        this.estadopedido = estadopedido;
    }
    public Date getFechapedido() {
        return fechapedido;
    }
    public void setFechapedido(Date fechapedido) {
        this.fechapedido = fechapedido;
    }
    public int getFk_iddomiciliario() {
        return fk_iddomiciliario;
    }
    public void setFk_iddomiciliario(int fk_iddomiciliario) {
        this.fk_iddomiciliario = fk_iddomiciliario;
    }


   
    
}
