package com.sgecr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Insumo;
import com.sgecr.repository.InsumoRepository;

@Service
public class InsumoService {
    @Autowired
    InsumoRepository repository;


    public List<Insumo>getAllInsumos(){
        return repository.findAll();
     }
     public Optional<Insumo> getInsumo(int id){
        return repository.findById(id);
     }
     public void postInsumo(Insumo u){
        repository.save(u);
     }
     public void postArrayInsumos(List<Insumo> insumos){
        for(Insumo i : insumos){
            repository.save(i);
        }
     }
     public void deleteInsumo(int id){
      repository.deleteById(id);
   }
}
