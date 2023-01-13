package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "detallesporventa")
public class DetallePorVenta implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int iddetalleventa;
    @Column
    private int valorunitariodetalle;
    @Column
    private int cantidaddetalle;
    @Column
    private int iva;
    @Column
    private int subtotaldetalle;
    @Column
    private int totaldetalle;
    @Column
    private int productos_idproductos;
    @Column
    private int ventas_idventas;
    
    public DetallePorVenta(int iddetalleventa,  int valorunitariodetalle, int cantidaddetalle, int iva,
            int subtotaldetalle, int totaldetalle, int productos_idproductos, int ventas_idventas) {
        this.iddetalleventa = iddetalleventa;
        this.valorunitariodetalle = valorunitariodetalle;
        this.cantidaddetalle = cantidaddetalle;
        this.iva = iva;
        this.subtotaldetalle = subtotaldetalle;
        this.totaldetalle = totaldetalle;
        this.productos_idproductos = productos_idproductos;
        this.ventas_idventas = ventas_idventas;
    }
    public DetallePorVenta() {
    }
    public int getIddetalleventa() {
        return iddetalleventa;
    }
    public void setIddetalleventa(int iddetalleventa) {
        this.iddetalleventa = iddetalleventa;
    }
   
    public int getvalorunitariodetalle() {
        return valorunitariodetalle;
    }
    public void setvalorunitariodetalle(int valorunitariodetalle) {
        this.valorunitariodetalle = valorunitariodetalle;
    }
    public int getCantidaddetalle() {
        return cantidaddetalle;
    }
    public void setCantidaddetalle(int cantidaddetalle) {
        this.cantidaddetalle = cantidaddetalle;
    }
    public int getIva() {
        return iva;
    }
    public void setIva(int iva) {
        this.iva = iva;
    }
    public int getsubtotaldetalle() {
        return subtotaldetalle;
    }
    public void setsubtotaldetalle(int subtotaldetalle) {
        this.subtotaldetalle = subtotaldetalle;
    }
    public int gettotalDetalle() {
        return totaldetalle;
    }
    public void settotaldetalle(int totaldetalle) {
        this.totaldetalle = totaldetalle;
    }
    public int getProductos_idproductos() {
        return productos_idproductos;
    }
    public void setProductos_idproductos(int productos_idproductos) {
        this.productos_idproductos = productos_idproductos;
    }
    public int getVentas_idventas() {
        return ventas_idventas;
    }
    public void setVentas_idventas(int ventas_idventas) {
        this.ventas_idventas = ventas_idventas;
    }
}
