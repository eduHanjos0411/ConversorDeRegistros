package com.dudu.ConversorDeRegistros.entity;

import com.dudu.ConversorDeRegistros.enums.DocumentoFiscal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Registro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date dataDeLancamento;
    private String informacaoDaCompra;
    private Double valorDaCompra;
    private String lojaDaCompra;

    @Enumerated(EnumType.STRING)
    private DocumentoFiscal tipoDeDocumento;
}
