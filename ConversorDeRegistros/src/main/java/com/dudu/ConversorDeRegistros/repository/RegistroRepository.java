package com.dudu.ConversorDeRegistros.repository;

import com.dudu.ConversorDeRegistros.entity.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Integer> {
}
