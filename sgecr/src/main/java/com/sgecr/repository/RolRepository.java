package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.Rol;
@Repository
public interface RolRepository extends JpaRepository<Rol,Integer>{

}