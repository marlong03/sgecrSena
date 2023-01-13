package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.PedidoHasProducto;
@Repository
public interface PedidoHasProductoRepository extends JpaRepository<PedidoHasProducto,Integer> {
    
}
