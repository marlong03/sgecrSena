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

import com.sgecr.model.CategoriaInsumo;
import com.sgecr.service.CategoriaInsumoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/categoriainsumo/")
public class CategoriaInsumoController {
    @Autowired
    CategoriaInsumoService service;

    @GetMapping("all")
    public List<CategoriaInsumo> getInsumos(){
        return service.getAllCategoriaInsumos();
    }
    @GetMapping("{id}")
    public Optional<CategoriaInsumo> getCategoriaInsumo(@PathVariable int id){
        return service.getCategoriaInsumo(id);
    }
   
    @PostMapping("new")
    public void postCategoriaInsumo(@RequestBody CategoriaInsumo u){
        service.postCategoriaInsumo(u);
    }
    @DeleteMapping("eliminar/{id}")
    public int deleteCategoriaInsumo(@PathVariable int id){
        service.deleteCategoriaInsumo(id);
        return id;
    }
}
