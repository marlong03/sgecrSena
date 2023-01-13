package com.sgecr.service;

import org.springframework.stereotype.Service;

import com.sgecr.model.RolHasPermiso;
import com.sgecr.repository.RolHasPermisoRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class RolHasPermisoService {
    @Autowired
    RolHasPermisoRepository repository;


    public List<RolHasPermiso>getAllRolHasPermisos(){
        return repository.findAll();
     }
     public Optional<RolHasPermiso> getRolHasPermiso(int id){
        return repository.findById(id);
     }
     public void postRolHasPermiso(RolHasPermiso u){
        repository.save(u);
     }
     public void deleteRolHasPermiso(int id){
      repository.deleteById(id);
   }
}
