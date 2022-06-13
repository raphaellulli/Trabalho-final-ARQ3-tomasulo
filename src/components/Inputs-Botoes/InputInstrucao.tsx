import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';
import { TipoInstrucao } from '../../Enums/TipoInstrucao';

interface IProps {
    index: number;
}

const InputInstrucao: React.FC<IProps> = ({
    index
}) => {
    const {
        arrInstrucoes,
        confirmado,
    } = useContext(IntrucaoContext);

    const AssociarInstrucao = (valor: string, indexInstrucao: number) => {
        const newArray = arrInstrucoes.value.map((i, ind) => {
            if (ind === index) {
                if (indexInstrucao === 1)
                    i.entrada1 = valor?.toUpperCase();
                else if (indexInstrucao === 2)
                    i.entrada2 = valor?.toUpperCase();
                else if (indexInstrucao === 3)
                    i.entrada3 = valor?.toUpperCase();
                else if (indexInstrucao === 4)
                    i.nome = valor as any;
            }
            return i;
        })
        arrInstrucoes.setValue([...newArray]);
    }

    // function uuid(mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    //     return `${mask}`.replace(/[xy]/g, function (c) {
    //         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    // }

    const onMount = () => {
        if (index >= arrInstrucoes.length)
            arrInstrucoes.push({
                id: (index+1)+"",
                nome: 'Add',
                enviada: false,
                executada: false,
                escrita: false,
                commited: false,
                entrada1: '',
                entrada2: '',
                entrada3: '',
            });
        else {
            throw new Error('Index inválido, tem algo errado aí! (inputInstrucao.OnMount)');
        }
        return () => {
            arrInstrucoes.removeIndex(index);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMount, []);

    return (
        <Wrapper>
            <label style={{ marginRight: '12px' }}>
                Instrução - {index + 1}
            </label>
            <select
                style={{ width: '75px', marginRight: '2px', padding: '4px' }}
                value={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
                defaultValue={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
                onChange={(valor) => { AssociarInstrucao(valor.target.value, 4) }}
            >
                {
                    Object.keys(TipoInstrucao).map((i: any, ind: number) =>
                        <option
                            disabled={confirmado}
                            key={"option-tipo-instrucao-" + ind}
                            value={i}
                        >
                            <div>
                                <label>
                                    {i}
                                </label>
                            </div>
                        </option>
                    )
                }
            </select>
            <input
                disabled={confirmado}
                placeholder='Reg Destino'
                value={arrInstrucoes.value[index]?.entrada1 ?? ''}
                onChange={(e) => { AssociarInstrucao(e.target.value, 1) }}
            />
            <input
                disabled={confirmado}
                placeholder='Reg Origem'
                value={arrInstrucoes.value[index]?.entrada2 ?? ''}
                onChange={(e) => { AssociarInstrucao(e.target.value, 2) }}
            />
            <input
                disabled={confirmado}
                placeholder='Reg Origem'
                value={arrInstrucoes.value[index]?.entrada3 ?? ''}
                onChange={(e) => { AssociarInstrucao(e.target.value, 3) }}
            />
        </Wrapper>
    );
}

export default InputInstrucao;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
    margin: 2px;
    width: 100%;

    input{
        width: 100px;
        margin-right: 2px;
        padding: 4px;
    }
`;
