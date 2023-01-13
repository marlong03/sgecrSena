package com.sgecr.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "permisos")
public class Permiso implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpermiso;

    @Column
    private String descripcion;

    public Permiso() {
    }

    public Permiso(int idpermiso, String descripcion) {
        this.idpermiso = idpermiso;
        this.descripcion = descripcion;
    }

    public int getidpermiso() {
        return idpermiso;
    }

    public void setidpermiso(int idpermiso) {
        this.idpermiso = idpermiso;
    }

    public String getdescripcion() {
        return descripcion;
    }

    public void setdescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
