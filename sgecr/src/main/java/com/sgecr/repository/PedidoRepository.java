package com.sgecr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Integer> {
    /* Boolean deleteByReferencia(String referencia); */
    /* Pedido findByReferencia(String referencia); */
    Pedido findByReferenciapedido(String referenciaPedido);
}
