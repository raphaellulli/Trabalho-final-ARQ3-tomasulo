import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../App';

const InputInstrucoes: React.FC = () => {

    const {
        quantidadeInstrucoes,
        setQuantidadeInstrucoes,
    } = useContext(IntrucaoContext);

    return (
        <Wrapper
            title='Quantidade de instruções'
        >
            <div
                className='qtd-instrucoes-wrapper'
            >
                <div className='qtd-instrucoes'>
                    <button
                        onClick={() => { if (quantidadeInstrucoes === 1) return; setQuantidadeInstrucoes(quantidadeInstrucoes - 1); }}
                    >
                        -
                    </button>
                    <input
                        type={'number'}
                        value={quantidadeInstrucoes}
                        onChange={(e) => { if (Number(e.target.value) <= 0) return; setQuantidadeInstrucoes(Number(e.target.value)) }}
                    />
                    <button
                        onClick={() => setQuantidadeInstrucoes(quantidadeInstrucoes + 1)}
                    >
                        +
                    </button>

                </div>
            </div>
            
        </Wrapper >
    );
}

export default InputInstrucoes;

const Wrapper = styled.div`
	display: flex;
    position: relative;
	flex-direction: column;
	align-items: center;
    padding-right: 130px;

    .qtd-instrucoes-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        .qtd-instrucoes{
            display: flex;
            flex-direction: row;
        }
    }
`;
