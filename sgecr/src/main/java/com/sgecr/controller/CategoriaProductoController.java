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

import com.sgecr.model.CategoriaProducto;
import com.sgecr.service.CategoriaProductoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/categoriaproducto/")
public class CategoriaProductoController {
    @Autowired
    CategoriaProductoService service;

    @GetMapping("all")
    public List<CategoriaProducto> getProductos(){
        return service.getAllCategoriaProductos();
    }
    @GetMapping("{id}")
    public Optional<CategoriaProducto> getCategoriaProducto(@PathVariable int id){
        return service.getCategoriaProducto(id);
    }
   
    @PostMapping("new")
    public void postCategoriaProducto(@RequestBody CategoriaProducto u){
        service.postCategoriaProducto(u);
    }
    @DeleteMapping("eliminar/{id}")
    public int deleteCategoriaProducto(@PathVariable int id){
        service.deleteCategoriaProducto(id);
        return id;
    }
}
