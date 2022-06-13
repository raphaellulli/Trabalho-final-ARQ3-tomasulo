import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';

const TabelaEstacaoReserva: React.FC = () => {
    const {
        arrEstacaoReserva,
    } = useContext(IntrucaoContext);

    return (
        <Tablea>
            <thead>
                <tr>
                    <Superior>Ciclos</Superior>
                    <Superior>Nome</Superior>
                    <Superior>Ocupada</Superior>
                    <Superior>Operação</Superior>
                    <Superior>Vj</Superior>
                    <Superior>Vk</Superior>
                    <Superior>Qj</Superior>
                    <Superior>Qk</Superior>
                    <Superior>A</Superior>
                    <Superior>Destino</Superior>
                </tr>
            </thead>
            <tbody>
                {
                    (arrEstacaoReserva && arrEstacaoReserva.value && arrEstacaoReserva.value.length)
                    && arrEstacaoReserva.value.sort((a, b) => a.nome.localeCompare(b.nome)).map((estacaoReserva, ind) =>
                        <tr key={"tr-estacao-reserva" + ind}>
                            <Inferior>{estacaoReserva.Ciclos !== undefined ? estacaoReserva.Ciclos.toString() : ''}</Inferior>
                            <Inferior>{estacaoReserva.nome}</Inferior>
                            <Inferior>{estacaoReserva.ocupada ? 'X' : ''}</Inferior>
                            <Inferior>{estacaoReserva.operacao}</Inferior>
                            <Inferior>{estacaoReserva.Vj}</Inferior>
                            <Inferior>{estacaoReserva.Vk}</Inferior>
                            <Inferior>{estacaoReserva.Qj}</Inferior>
                            <Inferior>{estacaoReserva.Qk}</Inferior>
                            <Inferior>{estacaoReserva.A}</Inferior>
                            <Inferior>{estacaoReserva.destino}</Inferior>
                        </tr>
                    )
                }
            </tbody>
        </Tablea>
    );
}

export default TabelaEstacaoReserva;

const Tablea = styled.table`
	border: 2px solid #777777;
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
    padding: 10px 3px 10px 3px;
`;