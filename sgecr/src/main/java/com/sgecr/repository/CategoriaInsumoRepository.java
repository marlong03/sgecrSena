package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.sgecr.model.CategoriaInsumo;
@Service
@Repository
public interface CategoriaInsumoRepository extends JpaRepository<CategoriaInsumo,Integer> {
    
}
