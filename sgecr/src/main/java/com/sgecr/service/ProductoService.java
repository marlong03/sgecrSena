package com.sgecr.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Producto;
import com.sgecr.repository.ProductoRepository;
@Service
public class ProductoService {
    @Autowired
    ProductoRepository repository;

    public List<Producto>getAllProductos(){
        return repository.findAll();
     }
     public Optional<Producto> getProducto(int id){
        return repository.findById(id);
     }
     public void postProducto(Producto u){
        repository.save(u);
     }
     public void deleteProducto(int id){
      repository.deleteById(id);
   }
   public void postArrayProductos(List<Producto> productos){
      for(Producto p : productos){
         repository.save(p);
      }
   }

}
