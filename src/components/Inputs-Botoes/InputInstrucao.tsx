import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../../App";
import { TipoInstrucao } from "../../Enums/TipoInstrucao";

interface IProps {
  index: number;
}

const InputInstrucao: React.FC<IProps> = ({ index }) => {
  const { ArrayDeInstrucoes: arrInstrucoes, confirmado } =
    useContext(IntrucaoContext);

  const AssociarInstrucao = (valor: string, indexInstrucao: number) => {
    const newArray = arrInstrucoes.value.map((i, ind) => {
      if (ind === index) {
        if (indexInstrucao === 1) i.input1 = valor?.toUpperCase();
        else if (indexInstrucao === 2) i.input2 = valor?.toUpperCase();
        else if (indexInstrucao === 3) i.input3 = valor?.toUpperCase();
        else if (indexInstrucao === 4) i.nome = valor as any;
      }
      return i;
    });
    arrInstrucoes.setValue([...newArray]);
  };

  const onMount = () => {
    if (index >= arrInstrucoes.length)
      arrInstrucoes.push({
        id: index + 1 + "",
        nome: "Add",
        enviada: false,
        resultado: false,
        escrita: false,
        commitada: false,
        input1: "",
        input2: "",
        input3: "",
        lixo: false,
      });
    else {
      throw new Error(
        "Index inválido, tem algo errado aí! (inputInstrucao.OnMount)"
      );
    }
    return () => {
      arrInstrucoes.removeIndex(index);
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);

  return (
    <Wrapper>
      <Instrucao>Instrução - {index + 1}</Instrucao>
      <Select
        value={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
        defaultValue={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
        onChange={(valor) => {
          AssociarInstrucao(valor.target.value, 4);
        }}
      >
        {Object.keys(TipoInstrucao).map((i: any, ind: number) => (
          <option
            disabled={confirmado}
            key={"option-tipo-instrucao-" + ind}
            value={i}
          >
            <div>
              <label>{i.toUpperCase()}</label>
            </div>
          </option>
        ))}
      </Select>
      <Input
        disabled={confirmado}
        placeholder="DESTINO"
        value={arrInstrucoes.value[index]?.input1 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 1);
        }}
      />
      <Input
        disabled={confirmado}
        placeholder="ORIGEM"
        value={arrInstrucoes.value[index]?.input2 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 2);
        }}
      />
      <Input
        disabled={confirmado}
        placeholder="ORIGEM"
        value={arrInstrucoes.value[index]?.input3 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 3);
        }}
      />
    </Wrapper>
  );
};

export default InputInstrucao;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px;
  width: 100%;
`;

const Instrucao = styled.label`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  margin-right: 12px;
`;

const Select = styled.select`
  width: 75px;
  margin-right: 2px;
  padding: 4px;
`;

const Input = styled.input`
  width: 80px;
  margin-right: 2px;
  padding: 4px;
`;
