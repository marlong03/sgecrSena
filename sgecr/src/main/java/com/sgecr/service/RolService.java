package com.sgecr.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Rol;
import com.sgecr.repository.RolRepository;


@Service
public class RolService {
    @Autowired
    RolRepository repository;


    public List<Rol>getAllRols(){
        return repository.findAll();
     }
     public Optional<Rol> getRol(int id){
        return repository.findById(id);
     }
     public void postRol(Rol u){
        repository.save(u);
     }
     public void deleteRol(int id){
      repository.deleteById(id);
   }

}
