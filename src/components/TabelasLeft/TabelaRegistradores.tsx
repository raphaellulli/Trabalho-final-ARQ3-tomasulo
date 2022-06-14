import React, { useContext } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../../App";

const TabelaRegistradores: React.FC = () => {
  const { ArrayDeRegistrador: arrRegistrador, ArrayDeInstrucoes } =
    useContext(IntrucaoContext);

  return (
    <Tabela>
      <thead>
        <tr>
          {arrRegistrador &&
            arrRegistrador.value &&
            arrRegistrador.value.length &&
            arrRegistrador.value.map((registrador) => (
              <Superior>{registrador.nome}</Superior>
            ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {arrRegistrador &&
            arrRegistrador.value &&
            arrRegistrador.value.length &&
            arrRegistrador.value.map((registrador) => (
              <Inferior>
                {registrador.valor
                  ? (ArrayDeInstrucoes.value.find(
                      (i) => i.input1 == registrador.valor
                    )?.input2 ?? "") +
                    " + " +
                    (ArrayDeInstrucoes.value.find(
                      (i) => i.input1 == registrador.valor
                    )?.input3 ?? "")
                  : ""}
              </Inferior>
            ))}
        </tr>
      </tbody>
    </Tabela>
  );
};

export default TabelaRegistradores;

const Tabela = styled.table`
  border-bottom: 3px solid #777777;
  text-align: center;
  padding: 5px;
`;

const Superior = styled.th`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  border: 2px solid #777777;
  padding: 10px;
`;

const Inferior = styled.th`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  border: 2px solid #777777;
  padding: 15px;
`;
