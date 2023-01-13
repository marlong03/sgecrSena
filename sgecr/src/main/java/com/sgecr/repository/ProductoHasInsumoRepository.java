package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.ProductoHasInsumo;
@Repository
public interface ProductoHasInsumoRepository extends JpaRepository<ProductoHasInsumo,Integer> {
    
}
