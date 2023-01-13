package com.sgecr.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.CategoriaInsumo;
import com.sgecr.repository.CategoriaInsumoRepository;

/* import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; */

/* import com.sgecr.repository.CategoriaInsumoRepository; */
/* import com.sgecr.model.CategoriaInsumo; */

@Service
public class CategoriaInsumoService {
    @Autowired
    CategoriaInsumoRepository repository;
    


    public List<CategoriaInsumo>getAllCategoriaInsumos(){
        return repository.findAll();
     }
     public Optional<CategoriaInsumo> getCategoriaInsumo(int id){
        return repository.findById(id);
     }
     public void postCategoriaInsumo(CategoriaInsumo u){
        repository.save(u);
     }
     public void deleteCategoriaInsumo(int id){
      repository.deleteById(id);
   }
}
