package com.sgecr.service;

import org.springframework.stereotype.Service;

import com.sgecr.model.DetallePorVenta;
import com.sgecr.repository.DetallePorVentaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class DetallePorVentaService {
    @Autowired
    DetallePorVentaRepository repository;

    public List<DetallePorVenta>getAllDetallePorVentas(){
        return repository.findAll();
     }
     public Optional<DetallePorVenta> getDetallePorVenta(int id){
        return repository.findById(id);
     }
     public void postDetallePorVenta(DetallePorVenta u){
        repository.save(u);
     }
     public void deleteDetallePorVenta(int id){
      repository.deleteById(id);
    }
}
