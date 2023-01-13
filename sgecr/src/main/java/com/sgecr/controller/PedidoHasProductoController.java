package com.sgecr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgecr.model.PedidoHasProducto;
import com.sgecr.service.PedidoHasProductoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pedidohasproducto/")
public class PedidoHasProductoController {

    @Autowired
    PedidoHasProductoService service;
    
    @GetMapping("all")
    public List<PedidoHasProducto> getAllPedidoHasProducto(){
        return service.getAllPedidoHasProductos();
    }
}
