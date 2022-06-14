import React from "react";
import styled from "styled-components";
import InstrucoesTotais from "../../components/TabelasRight/InstrucoesTotais";
import CiclosPorInstrucao from "../../components/TabelasRight/CiclosPorInstrucao";
import QuantidadeTipoRegistrador from "../../components/TabelasRight/QuantidadeTipoRegistrador";

const TelaDireita: React.FC = () => {
  return (
    <Wrapper>
      <ParteTopo>
        <Borda>
          <InstrucoesTotais />
        </Borda>
      </ParteTopo>
      <ParteBaixo>
        <Borda>
          <CiclosPorInstrucao />
        </Borda>
        <Borda>
          <QuantidadeTipoRegistrador />
        </Borda>
      </ParteBaixo>
    </Wrapper>
  );
};

export default TelaDireita;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ParteTopo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ParteBaixo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Borda = styled.div`
  padding: 15px;
  margin: 15px;
  display: flex;
  justify-content: "center";
  align-content: "center";
  align-items: "center";
  border-style: double;
  border-width: 3px;
  border-color: #777777;
  border-radius: 8px;
`;
