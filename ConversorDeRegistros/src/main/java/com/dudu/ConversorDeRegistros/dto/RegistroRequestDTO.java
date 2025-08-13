package com.dudu.ConversorDeRegistros.dto;

import com.dudu.ConversorDeRegistros.enums.DocumentoFiscal;

import java.util.Date;

public record RegistroRequestDTO(
        Date dDL,
        String info,
        Double vDC,
        String lDC,
        DocumentoFiscal tDD
) {
}
