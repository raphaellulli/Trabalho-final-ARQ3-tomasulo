import React, { useContext } from 'react';
import styled from 'styled-components';
import { IInstrucoes, IntrucaoContext } from '../../App';

const TabelaReordenamento: React.FC = () => {

    const {
        arrBufferReordenamento,
        arrInstrucoes,
    } = useContext(IntrucaoContext);

    const getEstadoInstrucao = (intrucao: IInstrucoes) => {
        if (intrucao.commited)
            return "Commit";
        if (intrucao.escrita)
            return "Write back";
        if (intrucao.executada)
            return "Executed";
        if (intrucao.enviada)
            return "Issue";
        return "????";
    }

    return (
        <Wrapper>
            <Tabela>
                <div>
                    <Titulo>
                        Instruções
                    </Titulo>
                </div>
                <div>
                    <thead>
                        <tr>
                            <Superior>Entrada</Superior>
                            <Superior>Ocupado</Superior>
                            <Superior>Instrução</Superior>
                            <Superior>Estado</Superior>
                            <Superior>Destino</Superior>
                        </tr>
                    </thead>
                    <tbody>
                        {(arrBufferReordenamento && arrBufferReordenamento.value && arrBufferReordenamento.value.length)
                            ? arrBufferReordenamento.value.map((bufferRe, ind) => {
                                const instrucao = arrInstrucoes.value.find(instrucao => instrucao.id === bufferRe.idInstrucao);
                                if (!instrucao) return (
                                    <tr>
                                        <Inferior></Inferior>
                                        <Inferior></Inferior>
                                        <Inferior></Inferior>
                                        <Inferior></Inferior>
                                        <Inferior></Inferior>
                                    </tr>)
                                return (
                                    <tr>
                                        <Inferior>{ind + 1}</Inferior>
                                        <Inferior>{!instrucao.commited ? 'X' : ''}</Inferior>
                                        <Inferior>
                                            {
                                                instrucao.nome +
                                                (!!instrucao.entrada1 ? ", " + instrucao.entrada1.toUpperCase() : '') +
                                                (!!instrucao.entrada2 ? ", " + instrucao.entrada2.toUpperCase() : '') +
                                                (!!instrucao.entrada3 ? ", " + instrucao.entrada3?.toUpperCase() : '')
                                            }
                                        </Inferior>
                                        <Inferior>{getEstadoInstrucao(instrucao)}</Inferior>
                                        <Inferior>{instrucao.entrada1}</Inferior>
                                    </tr>)
                            }
                            )
                            :
                            <tr>
                                <Inferior></Inferior>
                                <Inferior></Inferior>
                                <Inferior></Inferior>
                                <Inferior></Inferior>
                                <Inferior></Inferior>
                            </tr>
                        }
                    </tbody>
                </div>
            </Tabela>
        </Wrapper >
    );
}

export default TabelaReordenamento;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
    height: fit-content;
    max-height: 60vh;
`;

const Tabela = styled.table`
    text-align: center;
	border: 2px solid #777777;
    padding: 5px;
`;

const Titulo = styled.label`
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
`;

const Superior = styled.th`
    border: 2px solid #777777;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
`;

const Inferior = styled.td`
    border: 2px solid #777777;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    padding: 18px 3px 18px 3px;
`;