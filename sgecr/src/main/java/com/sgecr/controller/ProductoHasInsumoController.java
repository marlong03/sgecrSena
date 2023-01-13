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

import com.sgecr.model.ProductoHasInsumo;
import com.sgecr.service.ProductoHasInsumoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/productohasinsumo/")
public class ProductoHasInsumoController {
    @Autowired
    ProductoHasInsumoService service;

    @GetMapping("all")
    public List<ProductoHasInsumo> getProductoHasInsumos(){
        return service.getAllProductoHasInsumos();
    }
    @GetMapping("{id}")
    public Optional<ProductoHasInsumo> getProductoHasInsumos(@PathVariable int id){
        return service.getProductoHasInsumo(id);
    }
   
    @PostMapping("new")
    public void postProductoHasInsumo(@RequestBody ProductoHasInsumo u){
        service.postProductoHasInsumo(u);
    }
    @DeleteMapping("{id}")
    public int deleteProductoHasInsumo(@PathVariable int id){
        service.deleteProductoHasInsumo(id);
        return id;
    }
}
