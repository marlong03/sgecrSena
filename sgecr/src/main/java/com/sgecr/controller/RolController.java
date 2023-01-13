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

import com.sgecr.model.Rol;
import com.sgecr.service.RolService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/rol/")
public class RolController {
    @Autowired
    RolService service;

    @GetMapping("all")
    public List<Rol> getRols(){
        return service.getAllRols();
    }
    @GetMapping("{id}")
    public Optional<Rol> getRols(@PathVariable int id){
        return service.getRol(id);
    }
   
    @PostMapping("new")
    public void postRol(@RequestBody Rol u){
        service.postRol(u);
    }
    @DeleteMapping("{id}")
    public int deleteRol(@PathVariable int id){
        service.deleteRol(id);
        return id;
    }
}
