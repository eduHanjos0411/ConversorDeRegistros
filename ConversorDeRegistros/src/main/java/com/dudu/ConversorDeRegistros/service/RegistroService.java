package com.dudu.ConversorDeRegistros.service;

import com.dudu.ConversorDeRegistros.dto.RegistroRequestDTO;
import com.dudu.ConversorDeRegistros.dto.RegistroResponseDTO;
import com.dudu.ConversorDeRegistros.entity.Registro;
import com.dudu.ConversorDeRegistros.repository.RegistroRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class RegistroService {

    public final RegistroRepository repository;

    public RegistroService(RegistroRepository repository) {
        this.repository = repository;
    }

    public RegistroResponseDTO criarNovoRegistro(RegistroRequestDTO conteudo) {
        Registro novo = new Registro();

        novo.setDataDeLancamento(conteudo.dDL());
        novo.setInformacaoDaCompra(conteudo.info());
        novo.setValorDaCompra(conteudo.vDC());
        novo.setLojaDaCompra(conteudo.lDC());
        novo.setTipoDeDocumento(conteudo.tDD());

        repository.save(novo);
        return new RegistroResponseDTO(novo);
    }

    public List<RegistroResponseDTO> todosOsRegistros() {
        return repository.findAll().stream().map(RegistroResponseDTO::new).toList();
    }

    public RegistroResponseDTO registroPorId(Integer id) {
        Registro registroEncontrado = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro com id: " + id + " não encontrado"));

        return new RegistroResponseDTO(registroEncontrado);
    }

    public RegistroResponseDTO atualizarRegistro(Integer id, RegistroRequestDTO novoConteudo) {
        Registro registroEncontrado = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro com id: " + id + " não encontrado"));

        if (novoConteudo.dDL() != null) {registroEncontrado.setDataDeLancamento(novoConteudo.dDL());};
        if (novoConteudo.info() != null) {registroEncontrado.setInformacaoDaCompra(novoConteudo.info());};
        if (novoConteudo.vDC() != null) {registroEncontrado.setValorDaCompra(novoConteudo.vDC());};
        if (novoConteudo.lDC() != null) {registroEncontrado.setLojaDaCompra(novoConteudo.lDC());};
        if (novoConteudo.tDD() != null) {registroEncontrado.setTipoDeDocumento(novoConteudo.tDD());};

        repository.save(registroEncontrado);

        return new RegistroResponseDTO(registroEncontrado);
    }

    public void deletarRegistroPorId(Integer id) {
        repository.deleteById(id);
    }

}
