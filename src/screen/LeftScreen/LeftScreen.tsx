import React from 'react';
import styled from 'styled-components';
import TabelaEstacaoReserva from '../../components/TabelasLeft/TabelaEstacaoReserva';
import TabelaRegistradores from '../../components/TabelasLeft/TabelaRegistradores';
import TabelaReordenamento from '../../components/TabelasLeft/TabelaReordenamento';

const LeftScreen: React.FC = () => {

    return (
        <Wrapper>
            <TabelaRegistradores />
            <WrapperInferior>
                <TabelaEstacaoReserva />
                <TabelaReordenamento />
            </WrapperInferior>
        </Wrapper >
    );
}

export default LeftScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
    height: 100%;
`;

const WrapperInferior = styled.div`
    display: flex;
	flex-direction: row;
    margin-top: 50px;
    justify-content: space-around;
`;
