package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.DetallePorVenta;

@Repository
public interface DetallePorVentaRepository extends JpaRepository<DetallePorVenta,Integer> {
    
}
