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

import com.sgecr.model.DetallePorVenta;
import com.sgecr.service.DetallePorVentaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/detalleventa/")
public class DetallePorVentaController {
    @Autowired
    DetallePorVentaService service;

    @GetMapping("all")
    public List<DetallePorVenta> getDetallePorVentas(){
        return service.getAllDetallePorVentas();
    }
    @GetMapping("{id}")
    public Optional<DetallePorVenta> getDetallePorVentas(@PathVariable int id){
        return service.getDetallePorVenta(id);
    }
   
    @PostMapping("new")
    public void postDetallePorVenta(@RequestBody DetallePorVenta u){
        service.postDetallePorVenta(u);
    }
    @DeleteMapping("{id}")
    public int deleteDetallePorVenta(@PathVariable int id){
        service.deleteDetallePorVenta(id);
        return id;
    }
}
