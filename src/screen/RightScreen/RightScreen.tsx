import React from 'react';
import styled from 'styled-components';
import InstrucoesTotais from '../../components/TabelasRight/InstrucoesTotais';
import CiclosPorInstrucao from '../../components/TabelasRight/CiclosPorInstrucao';
import QuantidadeTipoRegistrador from '../../components/TabelasRight/QuantidadeTipoRegistrador';

const RightScreen: React.FC = () => {

    return (
        <Wrapper>
            <Borda>
                <InstrucoesTotais />
            </Borda>
            <Borda>
                <CiclosPorInstrucao />
            </Borda>
            <Borda>
                <QuantidadeTipoRegistrador />
            </Borda>
        </Wrapper >
    );
}

export default RightScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
    position: relative;
    height: 100%;
`;

const Borda = styled.div`
    padding: 15px;
    margin: 15px;
    display: flex;
    justify-content: 'center'; 
    align-content: 'center'; 
    align-items: 'center';
    border-style: double;
    border-width: 3px;
    border-color: #777777;
    border-radius: 8px;
`;