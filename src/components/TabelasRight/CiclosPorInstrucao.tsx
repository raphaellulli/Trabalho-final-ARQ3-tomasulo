import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';
import { TipoInstrucao } from '../../Enums/TipoInstrucao';

const CiclosPorInstrucao: React.FC = () => {

    const {
        arrCicloPorInstrucao,
    } = useContext(IntrucaoContext);

    return (
        <Wrapper>
            {Object.keys(TipoInstrucao).map((i: any, ind: number) =>
                <Content key={'ciclo-por-instrucao-' + ind}>
                    <Instrucao>
                        {i.toUpperCase()}
                    </Instrucao>
                    <Input
                        value={arrCicloPorInstrucao.findByStringId(i, 'TipoInstrucao').quantidade}
                        type="number"
                        onChange={(e) => {
                            if (Number(e.target.value) <= 0) return;
                            arrCicloPorInstrucao.setValue([
                                ...arrCicloPorInstrucao.value.map(cpi => {
                                    if (cpi.TipoInstrucao === i) {
                                        cpi.quantidade = Number(e.target.value);
                                    }
                                    return cpi;
                                })
                            ])
                        }}
                    />
                </Content>
            )}
        </Wrapper>
    );
}

export default CiclosPorInstrucao;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
    align-items: center;
    width: 100%;

`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
    align-items: center;
`;

const Instrucao = styled.label`
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    width: 40px;
`;

const Input = styled.input`
    width: 80px;
    margin-right: 2px;
    padding: 4px;
`;
