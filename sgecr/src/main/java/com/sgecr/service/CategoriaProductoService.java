package com.sgecr.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.CategoriaProducto;
import com.sgecr.repository.CategoriaProductoRepository;

/* import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; */

/* import com.sgecr.repository.CategoriaProductoRepository; */
/* import com.sgecr.model.CategoriaProducto; */

@Service
public class CategoriaProductoService {
    @Autowired
    CategoriaProductoRepository repository;
    


    public List<CategoriaProducto>getAllCategoriaProductos(){
        return repository.findAll();
     }
     public Optional<CategoriaProducto> getCategoriaProducto(int id){
        return repository.findById(id);
     }
     public void postCategoriaProducto(CategoriaProducto u){
        repository.save(u);
     }
     public void deleteCategoriaProducto(int id){
      repository.deleteById(id);
   }
}
