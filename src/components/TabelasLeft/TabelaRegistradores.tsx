import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../../App';


const TabelaRegistradores: React.FC = () => {
    const {
        arrRegistrador,
    } = useContext(IntrucaoContext);

    return (
        <Wrapper
            title='Registradores'
        >
            <STabela>
                <thead>
                    <tr>
                        {
                            (arrRegistrador && arrRegistrador.value && arrRegistrador.value.length)
                                ? arrRegistrador.value.map(registrador =>
                                    <th>{registrador.nome}</th>
                                )
                                :
                                <th>--</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            (arrRegistrador && arrRegistrador.value && arrRegistrador.value.length)
                                ? arrRegistrador.value.map(registrador =>
                                    <td>{registrador.valor}</td>
                                )
                                :
                                <td>--</td>
                        }
                    </tr>
                </tbody>
            </STabela>
        </Wrapper>
    );
}

export default TabelaRegistradores;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;    
    margin-top: 10px;
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
`;


const STabela = styled.table`
	border: 1px solid black;
	th{
		border: 1px solid gray;
		padding: 10px;
	}
	td { 
		border: 1px solid gray;
		padding: 10px;
	}
`;

