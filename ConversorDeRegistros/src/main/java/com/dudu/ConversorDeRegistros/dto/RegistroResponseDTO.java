package com.dudu.ConversorDeRegistros.dto;

import com.dudu.ConversorDeRegistros.entity.Registro;
import com.dudu.ConversorDeRegistros.enums.DocumentoFiscal;

import java.util.Date;

public record RegistroResponseDTO(
        Date dDL,
        String info,
        Double vDC,
        String lDC,
        DocumentoFiscal tDD
) {
    public RegistroResponseDTO(Registro r) {
        this(
                r.getDataDeLancamento(),
                r.getInformacaoDaCompra(),
                r.getValorDaCompra(),
                r.getLojaDaCompra(),
                r.getTipoDeDocumento()
        );
    }

    public RegistroResponseDTO(RegistroRequestDTO rr) {
        this(
                rr.dDL(),
                rr.info(),
                rr.vDC(),
                rr.lDC(),
                rr.tDD()
        );
    }
}
