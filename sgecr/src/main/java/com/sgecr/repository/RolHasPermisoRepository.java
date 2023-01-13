package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgecr.model.RolHasPermiso;

public interface RolHasPermisoRepository extends JpaRepository<RolHasPermiso,Integer> {
    
}
