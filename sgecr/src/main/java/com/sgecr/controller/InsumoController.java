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

import com.sgecr.model.Insumo;
import com.sgecr.service.InsumoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/insumo/")
public class InsumoController {
    @Autowired
    InsumoService service;

    @GetMapping("all")
    public List<Insumo> getInsumos(){
        return service.getAllInsumos();
    }
    @GetMapping("{id}")
    public Optional<Insumo> getInsumos(@PathVariable int id){
        return service.getInsumo(id);
    }
   
    @PostMapping("new")
    public void postInsumo(@RequestBody Insumo u){
        service.postInsumo(u);
    }
    @PostMapping("lista/new")
    public void postListInsumos(@RequestBody List<Insumo> u){
        service.postArrayInsumos(u);
    }
    @DeleteMapping("eliminar/{id}")
    public int deleteInsumo(@PathVariable int id){
        service.deleteInsumo(id);
        return id;
    }
}
