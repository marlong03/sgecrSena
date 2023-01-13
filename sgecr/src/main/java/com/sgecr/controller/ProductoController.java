package com.sgecr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgecr.model.Producto;
import com.sgecr.service.ProductoService;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/producto/")
public class ProductoController {
    @Autowired
    ProductoService service;

    @GetMapping("all")
    public List<Producto> getProductos(){
        return service.getAllProductos();
    }
    @GetMapping("{id}")
    public Optional<Producto> getProductosById(@PathVariable int id){
        return service.getProducto(id);
    }
    @PostMapping("lista/new")
    public void postListProductos(@RequestBody List<Producto> p){
        service.postArrayProductos(p);
    }
   
    @PostMapping("new")
    public void postProducto(@RequestBody Producto u){
        service.postProducto(u);
    }
    @DeleteMapping("eliminar/{id}")
    public int deleteProducto(@PathVariable int id){
        service.deleteProducto(id);
        return id;
    }
}
