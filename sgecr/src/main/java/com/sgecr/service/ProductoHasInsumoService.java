package com.sgecr.service;

import org.springframework.stereotype.Service;

import com.sgecr.model.ProductoHasInsumo;
import com.sgecr.repository.ProductoHasInsumoRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ProductoHasInsumoService {
    @Autowired
    ProductoHasInsumoRepository repository;

    public List<ProductoHasInsumo>getAllProductoHasInsumos(){
        return repository.findAll();
     }
     public Optional<ProductoHasInsumo> getProductoHasInsumo(int id){
        return repository.findById(id);
     }
     public void postProductoHasInsumo(ProductoHasInsumo u){
        repository.save(u);
     }
     public void deleteProductoHasInsumo(int id){
      repository.deleteById(id);
    }
}
