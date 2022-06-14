import React, { useContext } from "react";
import styled from "styled-components";
import { IInstrucoes, IntrucaoContext } from "../../App";

const TabelaReordenamento: React.FC = () => {
  const { arrBufferReordenamento, arrInstrucoes } = useContext(IntrucaoContext);

  const getEstadoInstrucao = (intrucao: IInstrucoes) => {
    if (intrucao.descartada) return "Descartada";
    if (intrucao.commited) return "Commit";
    if (intrucao.escrita) return "Write back";
    if (intrucao.executada) return "Executed";
    if (intrucao.enviada) return "Issue";
    return "????";
  };

  return (
    <Wrapper>
      <Tabela>
        <div>
          <Titulo>Instruções Reordenadas</Titulo>
        </div>
        <div>
          <thead>
            <tr>
              <Superior>Entrada</Superior>
              <Superior>Ocupado</Superior>
              <Superior>Instrução</Superior>
              <Superior>Estado</Superior>
              <Superior>Destino</Superior>
            </tr>
          </thead>
          <tbody>
            {arrInstrucoes &&
              arrInstrucoes.value &&
              arrInstrucoes.value.length &&
              arrInstrucoes.value.map((instrucao, ind) => {
                const buffer = arrBufferReordenamento.value.find(
                  (b) => b.idInstrucao === instrucao.id
                );

                return (
                  <tr>
                    <Inferior parametro={instrucao.descartada}>
                      {ind + 1}
                    </Inferior>
                    <Inferior parametro={instrucao.descartada}>
                      {!instrucao.commited && !instrucao.descartada ? "X" : ""}
                    </Inferior>
                    <Inferior parametro={instrucao.descartada}>
                      {instrucao.nome +
                        (!!instrucao.entrada1
                          ? ", " + instrucao.entrada1.toUpperCase()
                          : "") +
                        (!!instrucao.entrada2
                          ? ", " + instrucao.entrada2.toUpperCase()
                          : "") +
                        (!!instrucao.entrada3
                          ? ", " + instrucao.entrada3?.toUpperCase()
                          : "")}
                    </Inferior>
                    <Inferior parametro={instrucao.descartada}>
                      {!buffer && !instrucao.descartada
                        ? ""
                        : getEstadoInstrucao(instrucao)}
                    </Inferior>
                    <Inferior parametro={instrucao.descartada}>
                      {instrucao.entrada1}
                    </Inferior>
                  </tr>
                );
              })}
          </tbody>
        </div>
      </Tabela>
    </Wrapper>
  );
};

export default TabelaReordenamento;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  max-height: 60vh;
`;

const Tabela = styled.table`
  text-align: center;
  border: 2px solid #777777;
  padding: 5px;
`;

const Titulo = styled.label`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
`;

const Superior = styled.th`
  border: 2px solid #777777;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

const Inferior = styled.td<{ parametro: boolean }>`
  border: 2px solid #777777;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 18px 3px 18px 3px;
  ${(prop) => (prop.parametro ? "background: red" : "background: #d3d3d3")}
  ${(prop) =>
    prop.parametro ? "border-color: darkred" : "border-color: #777777"}
`;
