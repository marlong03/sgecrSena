package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.Venta;
@Repository
public interface VentaRepository extends JpaRepository<Venta,Integer> {
    
}
