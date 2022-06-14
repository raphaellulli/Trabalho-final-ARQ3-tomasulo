import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import styled from "styled-components";
import { useArray, UseArrayActions } from "./hooks/useArray";
import { TipoInstrucao } from "./Enums/TipoInstrucao";
import { TipoRegistrador } from "./Enums/TipoRegistrador";
import TelaDireita from "./screen/TelaDireita/TelaDireita";
import TelaEsquerda from "./screen/TelaEsquerda/TelaEsquerda";
import BotoesConfimarResetar from "./components/Inputs-Botoes/BotoesConfimarResetar";
import InputInstrucoes from "./components/Inputs-Botoes/InputInstrucoes";
import AvancarInstrucoes from "./components/Inputs-Botoes/AvancarInstrucoes";

export interface PropsInstrucoes {
  id: string;
  nome: keyof typeof TipoInstrucao;
  enviada: boolean;
  resultado: boolean;
  escrita: boolean;
  commitada: boolean;
  input1: string;
  input2: string;
  input3?: string;
  lixo: boolean;
}

export interface PropsReserva {
  nome: string;
  idInstrucao?: string;
  TipoRegistrador: keyof typeof TipoRegistrador;
  destino?: string;
  registradorSendoUtilizado?: string;
  busy: boolean;
  operacao?: string;
  VJ?: string;
  VK?: string;
  QJ?: string;
  QK?: string;
  A?: string;
  Ciclos?: number;
}
export interface PropsReordenamento {
  idInstrucao: string;
  valor?: string;
}
export interface PropsCiclos {
  TipoInstrucao: keyof typeof TipoInstrucao;
  quantidade: number;
}

export interface PropsRegistrador {
  nome: string;
  valor: string;
}

export interface PropsRegistradoresTipo {
  TipoRegistrador: keyof typeof TipoRegistrador;
  quantidade: number;
}

export interface PropsContextoDeInstrucao {
  ArrayDeInstrucoes: UseArrayActions<PropsInstrucoes>;
  ArrayDeEstacaoReserva: UseArrayActions<PropsReserva>;
  ArrayDeRegistrador: UseArrayActions<PropsRegistrador>;
  ArrayDeCiclodeInstrucao: UseArrayActions<PropsCiclos>;
  ArrayTipoRegistrador: UseArrayActions<PropsRegistradoresTipo>;
  ArrayDeReordenamentoDeBuffer: UseArrayActions<PropsReordenamento>;
  setQuantidadeInstrucoes: Dispatch<SetStateAction<number>>;
  quantidadeInstrucoes: number;
  setConfirmado: Dispatch<SetStateAction<boolean>>;
  confirmado: boolean;
  setCicloAtual: Dispatch<SetStateAction<number>>;
  cicloAtual: number;
  tamnhoBuffer: number;
}

export const IntrucaoContext = createContext<PropsContextoDeInstrucao>(
  {} as PropsContextoDeInstrucao
);

function App() {
  const [cicloAtual, setCicloAtual] = useState(0);
  const [resultado, setResultado] = useState<boolean>(false);
  const [totalDeInstrucao, setTotalDeInstrucao] = useState<number>(1);
  const ArrayDeInstrucoes = useArray<PropsInstrucoes>([]);
  const ArrayBufferDeReordenamento = useArray<PropsReordenamento>([]);
  const ArrayEstacaoReserva = useArray<PropsReserva>([]);
  const bufferTotal = 6;
  const arrRegistrador = useArray<PropsRegistrador>(
    new Array(16)
      .fill({ nome: "", valor: "" })
      .map((i, ind) => ({ nome: `F${ind}`, valor: "" }))
  );
  const arrCicloPorInstrucao = useArray<PropsCiclos>(
    Object.keys(TipoInstrucao).map((i: any, ind: number) => {
      return {
        quantidade: 1,
        TipoInstrucao: i,
      };
    })
  );
  const arrTipoRegistrador = useArray<PropsRegistradoresTipo>(
    Object.keys(TipoRegistrador).map((i: any, ind: number) => {
      return {
        quantidade: 1,
        TipoRegistrador: i,
      };
    })
  );

  const defaultValue: PropsContextoDeInstrucao = {
    ArrayDeInstrucoes: ArrayDeInstrucoes,
    ArrayDeEstacaoReserva: ArrayEstacaoReserva,
    ArrayDeRegistrador: arrRegistrador,
    ArrayDeCiclodeInstrucao: arrCicloPorInstrucao,
    ArrayDeReordenamentoDeBuffer: ArrayBufferDeReordenamento,
    ArrayTipoRegistrador: arrTipoRegistrador,
    quantidadeInstrucoes: totalDeInstrucao,
    setQuantidadeInstrucoes: setTotalDeInstrucao,
    confirmado: resultado,
    setConfirmado: setResultado,
    cicloAtual,
    setCicloAtual,
    tamnhoBuffer: bufferTotal,
  };

  return (
    <IntrucaoContext.Provider value={defaultValue}>
      <Wrapper>
        <TituloWrapper>
          <Titulo>Simulador de Tomasulo</Titulo>
        </TituloWrapper>
        <ParteTopo>
          <BotoesConfimarResetar />
          <Linha />
          <InputInstrucoes />
          <Linha />
          <AvancarInstrucoes />
        </ParteTopo>
        <ParteBaixo>
          <ParteEsquerda>
            <TelaEsquerda />
          </ParteEsquerda>
          <ParteDireita>
            <TelaDireita />
          </ParteDireita>
        </ParteBaixo>
      </Wrapper>
    </IntrucaoContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 99vh;
`;

const TituloWrapper = styled.div`
  padding: 10px;
`;

const Titulo = styled.label`
  font-family: impact;
  font-size: 35px;
  color: #777777;
`;

const ParteTopo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  background-color: #777777;
  height: 10%;
`;

const ParteBaixo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const ParteDireita = styled.div`
  width: 32%;
  height: 100%;
  background-color: #cccccc;
  border-top: 3px solid #777777;
  border-bottom: 3px solid #777777;
  border-right: 3px solid #777777;
`;

const ParteEsquerda = styled.div`
  width: 68%;
  height: 100%;
  background-color: #d3d3d3;
  border: 3px solid #777777;
`;

const Linha = styled.div`
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: white;
  align-self: center;
  height: 50%;
`;
