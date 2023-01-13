package com.sgecr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Venta;
import com.sgecr.repository.VentaRepository;
@Service
public class VentaService {
    @Autowired
    VentaRepository repository;

    public List<Venta>getAllVentas(){
        return repository.findAll();
     }
     public Optional<Venta> getVenta(int id){
        return repository.findById(id);
     }
     public void postVenta(Venta u){
        repository.save(u);
     }
     public void deleteVenta(int id){
      repository.deleteById(id);
   }
}
