import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';
import InputInstrucao from '../Inputs-Botoes/InputInstrucao';

const InstrucoesTotais: React.FC = () => {

    const {
        quantidadeInstrucoes,
    } = useContext(IntrucaoContext);

    const GerarCampoInstrucoes = () => {
        const arrFragmentInstrucao: JSX.Element[] = [];
        for (let i = 0; i < quantidadeInstrucoes; i++)
            arrFragmentInstrucao.push(
                <InputInstrucao key={`index-ionpt-instrucao-${i}`} index={i} />
            )
        return arrFragmentInstrucao;
    }

    return (
        <Wrapper>
            {GerarCampoInstrucoes()}
        </Wrapper>
    );
}

export default InstrucoesTotais;

const Wrapper = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: column;
`;