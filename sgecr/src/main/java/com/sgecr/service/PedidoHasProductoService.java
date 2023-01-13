package com.sgecr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.PedidoHasProducto;
import com.sgecr.repository.PedidoHasProductoRepository;

@Service
public class PedidoHasProductoService {
    @Autowired
    PedidoHasProductoRepository repository;
    public List<PedidoHasProducto>getAllPedidoHasProductos(){
        return repository.findAll();
    }

    public Optional<PedidoHasProducto> getPedidoHasProducto(int id){
        return repository.findById(id);
    }

    public void savePedidoHasProducto(PedidoHasProducto data){
        repository.save(data);
    }
    public int deletePedidoHasProducto(int id){
        repository.deleteById(id);
        return id;
    }
}
