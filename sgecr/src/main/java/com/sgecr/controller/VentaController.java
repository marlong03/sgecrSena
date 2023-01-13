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

import com.sgecr.model.Venta;
import com.sgecr.service.VentaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/venta/")
public class VentaController {
    @Autowired
    VentaService service;

    @GetMapping("all")
    public List<Venta> getVentas(){
        return service.getAllVentas();
    }
    @GetMapping("{id}")
    public Optional<Venta> getVentas(@PathVariable int id){
        return service.getVenta(id);
    }
   
    @PostMapping("new")
    public void postVenta(@RequestBody Venta u){
        service.postVenta(u);
    }
    @DeleteMapping("{id}")
    public int deleteVenta(@PathVariable int id){
        service.deleteVenta(id);
        return id;
    }
}
