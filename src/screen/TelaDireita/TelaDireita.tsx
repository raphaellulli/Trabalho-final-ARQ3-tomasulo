import React from "react";
import styled from "styled-components";
import InstrucoesTotais from "../../components/TabelasRight/InstrucoesTotais";

const TelaDireita: React.FC = () => {
  return (
    <Wrapper>
      <ParteTopo>
        <Borda>
          <InstrucoesTotais />
        </Borda>
      </ParteTopo>
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
