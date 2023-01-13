package com.sgecr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgecr.model.Insumo;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo,Integer> {

}
