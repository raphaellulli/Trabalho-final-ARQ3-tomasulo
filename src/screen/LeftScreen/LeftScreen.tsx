import React from 'react';
import styled from 'styled-components';
import TabelaEstacaoReserva from '../../components/TabelasLeft/TabelaEstacaoReserva';
import TabelaRegistradores from '../../components/TabelasLeft/TabelaRegistradores';
import TabelaReordenamento from '../../components/TabelasLeft/TabelaReordenamento';

const LeftScreen: React.FC = () => {

    return (
        <Wrapper>
            <TabelaRegistradores />
            <TabelaReordenamento />
            <TabelaEstacaoReserva />
        </Wrapper >
    );
}

export default LeftScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
    height: 100%;
    position: relative;

`;
