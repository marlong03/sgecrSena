package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "rol_has_permisos")
public class RolHasPermiso  implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rol_idrol;

    @Column
    private int rol_idrol1;

    public RolHasPermiso() {
    }

    public RolHasPermiso(int rol_idrol, int rol_idrol1) {
        this.rol_idrol = rol_idrol;
        this.rol_idrol1 = rol_idrol1;
    }

    public int getRol_idrol() {
        return rol_idrol;
    }

    public void setRol_idrol(int rol_idrol) {
        this.rol_idrol = rol_idrol;
    }

    public int getRol_idrol1() {
        return rol_idrol1;
    }

    public void setRol_idrol1(int rol_idrol1) {
        this.rol_idrol1 = rol_idrol1;
    }
}
