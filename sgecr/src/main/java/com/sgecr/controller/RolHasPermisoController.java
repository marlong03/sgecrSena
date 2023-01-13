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

import com.sgecr.model.RolHasPermiso;
import com.sgecr.service.RolHasPermisoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/rolhaspermiso/")
public class RolHasPermisoController {
    @Autowired
    RolHasPermisoService service;

    @GetMapping("all")
    public List<RolHasPermiso> getRolHasPermisos(){
        return service.getAllRolHasPermisos();
    }
    @GetMapping("{id}")
    public Optional<RolHasPermiso> getRolHasPermisos(@PathVariable int id){
        return service.getRolHasPermiso(id);
    }
   
    @PostMapping("new")
    public void postRolHasPermiso(@RequestBody RolHasPermiso u){
        service.postRolHasPermiso(u);
    }
    @DeleteMapping("{id}")
    public int deleteRolHasPermiso(@PathVariable int id){
        service.deleteRolHasPermiso(id);
        return id;
    }
    
}
