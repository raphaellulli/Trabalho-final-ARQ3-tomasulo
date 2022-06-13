import React from 'react';
import styled from 'styled-components';
import AvancarInstrucoes from './AvancarInstrucoes';
import TabelaEstacaoReserva from './TabelaEstacaoReserva';
import TabelaRegistradores from './TabelaRegistradores';
import TabelaReordenamento from './TabelaReordenamento';

const LeftScreen: React.FC = () => {

    return (
        <Wrapper>
            <div className='registradores'>
                <AvancarInstrucoes />
                <TabelaRegistradores />
            </div>
            <div className='instrucao-estacao-reserva'>
                <TabelaReordenamento />
                <TabelaEstacaoReserva />
            </div>
        </Wrapper >
    );
}

export default LeftScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    height: 100%;
    position: relative;

    .registradores{
        top: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20px;
    }

    .instrucao-estacao-reserva{
        height: 40vh;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        align-items: flex-start;
    }
`;
