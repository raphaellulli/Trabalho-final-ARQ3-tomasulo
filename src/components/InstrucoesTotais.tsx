import React, { useContext } from 'react';
import { IntrucaoContext } from '../App';
import InputInstrucao from './InputInstrucao';

const InstrucoesTotais: React.FC = () => {

    const {
        quantidadeInstrucoes,
    } = useContext(IntrucaoContext);

    const GerarCampoInstrucoes = () => {
        const arrFragmentInstrucao: JSX.Element[] = [];
        for (let i = 0; i < quantidadeInstrucoes; i++)
            arrFragmentInstrucao.push(<InputInstrucao key={`index-ionpt-instrucao-${i}`} index={i} />)
        return arrFragmentInstrucao;
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {
                GerarCampoInstrucoes()
            }

        </div>
    );
}

export default InstrucoesTotais;