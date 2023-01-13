package com.sgecr.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Permiso;
import com.sgecr.repository.PermisoRepository;
@Service
public class PermisoService {
    @Autowired
    PermisoRepository repository;

    public List<Permiso>getAllPermisos(){
        return repository.findAll();
     }
     public Optional<Permiso> getPermiso(int id){
        return repository.findById(id);
     }
     public void postPermiso(Permiso u){
        repository.save(u);
     }
     public void deletePermiso(int id){
      repository.deleteById(id);
    }
}
