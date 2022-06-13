import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';

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
                        className='myButtonLeft'
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
                        className='myButtonRight'
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
    margin-left: 15px;
    margin-right: 150px;

    .qtd-instrucoes-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        .qtd-instrucoes{
            display: flex;
            flex-direction: row;
        }
    }

    .myButtonLeft {
        box-shadow: inset 0px 1px 0px 0px #ffffff;
        background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color: #ededed;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #dcdcdc;
        display: inline-block;
        cursor: pointer;
        color: #777777;
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 24px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #ffffff;
    }
    .myButtonLeft:hover{
	    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	    background-color: #dfdfdf;
    }
    .myButtonLeft:active{
	    position: relative;
	    top: 1px;
    }
    .myButtonRight {
        box-shadow: inset 0px 1px 0px 0px #ffffff;
        background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color: #ededed;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        border: 1px solid #dcdcdc;
        display: inline-block;
        cursor: pointer;
        color: #777777;
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 24px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #ffffff;
    }
    .myButtonRight:hover{
	    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	    background-color: #dfdfdf;
    }
    .myButtonRight:active{
	    position: relative;
	    top: 1px;
    }
`;
