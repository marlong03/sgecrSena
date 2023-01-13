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

import com.sgecr.model.Permiso;
import com.sgecr.service.PermisoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/permiso/")

public class PermisoController {
    @Autowired
    PermisoService service;

    @GetMapping("all")
    public List<Permiso> getPermisos(){
        return service.getAllPermisos();
    }
    @GetMapping("{id}")
    public Optional<Permiso> getPermisos(@PathVariable int id){
        return service.getPermiso(id);
    }
   
    @PostMapping("new")
    public void postPermiso(@RequestBody Permiso u){
        service.postPermiso(u);
    }
    @DeleteMapping("{id}")
    public int deletePermiso(@PathVariable int id){
        service.deletePermiso(id);
        return id;
    }
}
