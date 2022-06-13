import React from 'react';
import styled from 'styled-components';
import InstrucoesTotais from '../../components/TabelasRight/InstrucoesTotais';
import CiclosPorInstrucao from '../../components/TabelasRight/CiclosPorInstrucao';
import QuantidadeTipoRegistrador from '../../components/TabelasRight/QuantidadeTipoRegistrador';

const RightScreen: React.FC = () => {

    return (
        <Wrapper>
            <div className='wrapper-ciclos-registrador'>
                <div className='borda-divisoria'>
                    <InstrucoesTotais />
                </div>
                <div className='borda-divisoria'>
                    <CiclosPorInstrucao />
                </div>
                <div className='borda-divisoria'>
                    <QuantidadeTipoRegistrador />
                </div>
            </div>
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

    .wrapper-ciclos-registrador{
        display: flex;
        flex-direction: column;
    }
    .borda-divisoria{
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
    }
`;
