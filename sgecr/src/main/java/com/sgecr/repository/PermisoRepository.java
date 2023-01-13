package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.Permiso;
@Repository
public interface PermisoRepository extends JpaRepository<Permiso,Integer> {
    
}
