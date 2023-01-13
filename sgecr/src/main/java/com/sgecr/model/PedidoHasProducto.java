package com.sgecr.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "pedidos_has_productos")
public class PedidoHasProducto  implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpedidos_has_productos;
    @Column
    private int pedidos_idpedidos;
    @Column
    private int productos_idproductos;
    
    public PedidoHasProducto() {
    }
    public PedidoHasProducto(int idpedidos_has_productos, int cantidad, int pedidos_idpedidos,
            int productos_idproductos, int valorunitario, int valortotal) {
        this.idpedidos_has_productos = idpedidos_has_productos;
        this.pedidos_idpedidos = pedidos_idpedidos;
        this.productos_idproductos = productos_idproductos;
      
    }
    public int getIdpedidos_has_productos() {
        return idpedidos_has_productos;
    }
    public void setIdpedidos_has_productos(int idpedidos_has_productos) {
        this.idpedidos_has_productos = idpedidos_has_productos;
    }
   
    public int getPedidos_idpedidos() {
        return pedidos_idpedidos;
    }
    public void setPedidos_idpedidos(int pedidos_idpedidos) {
        this.pedidos_idpedidos = pedidos_idpedidos;
    }
    public int getProductos_idproductos() {
        return productos_idproductos;
    }
    public void setProductos_idproductos(int productos_idproductos) {
        this.productos_idproductos = productos_idproductos;
    }
}
