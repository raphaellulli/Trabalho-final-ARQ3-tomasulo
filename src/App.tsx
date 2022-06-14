import React, { useState } from 'react';
import styled from 'styled-components';
import { useArray, UseArrayActions } from './hooks/useArray';
import { TipoInstrucao } from './Enums/TipoInstrucao';
import { TipoRegistrador } from './Enums/TipoRegistrador';
import TelaDireita from './screen/TelaDireita/TelaDireita';
import TelaEsquerda from './screen/TelaEsquerda/TelaEsquerda';
import BotoesConfimarResetar from './components/Inputs-Botoes/BotoesConfimarResetar';
import InputInstrucoes from './components/Inputs-Botoes/InputInstrucoes';
import AvancarInstrucoes from './components/Inputs-Botoes/AvancarInstrucoes';

export interface IInstrucoes {
	id: string;
	nome: keyof typeof TipoInstrucao;
	enviada: boolean;
	executada: boolean;
	escrita: boolean;
	commited: boolean;
	entrada1: string;
	entrada2: string;
	entrada3?: string;
}

export interface IEstacaoReserva {
	nome: string;
	idInstrucao?: string;
	TipoRegistrador: keyof typeof TipoRegistrador;
	destino?: string;
	registradorSendoUtilizado?: string;
	ocupada: boolean;
	operacao?: string;
	Vj?: string;
	Vk?: string;
	Qj?: string;
	Qk?: string;
	A?: string;
	Ciclos?: number;
}

export interface IRegistrador {
	nome: string;
	valor: string;
}

export interface ICicloPorInstrucao {
	TipoInstrucao: keyof typeof TipoInstrucao;
	quantidade: number;
}

export interface ITipoRegistrador {
	TipoRegistrador: keyof typeof TipoRegistrador;
	quantidade: number;
}

export interface IBufferReordenamento {
	idInstrucao: string;
	valor?: string;
}

export interface IIntrucaoContextProps {
	arrInstrucoes: UseArrayActions<IInstrucoes>;
	arrEstacaoReserva: UseArrayActions<IEstacaoReserva>;
	arrRegistrador: UseArrayActions<IRegistrador>;
	arrCicloPorInstrucao: UseArrayActions<ICicloPorInstrucao>;
	arrTipoRegistrador: UseArrayActions<ITipoRegistrador>;
	arrBufferReordenamento: UseArrayActions<IBufferReordenamento>;
	setQuantidadeInstrucoes: React.Dispatch<React.SetStateAction<number>>;
	quantidadeInstrucoes: number;
	setConfirmado: React.Dispatch<React.SetStateAction<boolean>>;
	confirmado: boolean;
	setCicloAtual: React.Dispatch<React.SetStateAction<number>>;
	cicloAtual: number;
	tamnhoBuffer: number;
}

export const IntrucaoContext = React.createContext<IIntrucaoContextProps>({} as IIntrucaoContextProps);

function App() {

	const tamnhoBuffer = 6;
	const [cicloAtual, setCicloAtual] = React.useState(0);
	const [quantidadeInstrucoes, setQuantidadeInstrucoes] = useState<number>(1);
	const [confirmado, setConfirmado] = useState<boolean>(false);
	const arrInstrucoes = useArray<IInstrucoes>([]);
	const arrBufferReordenamento = useArray<IBufferReordenamento>([]);
	const arrEstacaoReserva = useArray<IEstacaoReserva>([]);
	const arrRegistrador = useArray<IRegistrador>(new Array(16).fill({ nome: '', valor: '' }).map((i, ind) => ({ nome: `F${ind}`, valor: '' })));
	const arrCicloPorInstrucao = useArray<ICicloPorInstrucao>(Object.keys(TipoInstrucao).map((i: any, ind: number) => {
		return (
			{
				quantidade: 1,
				TipoInstrucao: i
			}
		)
	}));
	const arrTipoRegistrador = useArray<ITipoRegistrador>(Object.keys(TipoRegistrador).map((i: any, ind: number) => {
		return (
			{
				quantidade: 1,
				TipoRegistrador: i
			}
		)
	}));

	const defaultValue: IIntrucaoContextProps = {
		arrInstrucoes,
		arrEstacaoReserva,
		arrRegistrador,
		arrCicloPorInstrucao,
		arrBufferReordenamento,
		arrTipoRegistrador,
		quantidadeInstrucoes, setQuantidadeInstrucoes,
		confirmado, setConfirmado,
		cicloAtual, setCicloAtual,
		tamnhoBuffer
	}

	return (
		<IntrucaoContext.Provider value={defaultValue}>
			<Wrapper>
				<TituloWrapper>
					<Titulo>
						Simulador de Tomasulo
					</Titulo>
				</TituloWrapper>
				<ParteTopo>
					<BotoesConfimarResetar />
					<Linha />
					<AvancarInstrucoes />
					<InputInstrucoes />
				</ParteTopo>
				<ParteBaixo>
					<ParteEsquerda>
						<TelaEsquerda />
					</ParteEsquerda>
					<ParteDireita>
						<TelaDireita />
					</ParteDireita>
				</ParteBaixo>
			</Wrapper>
		</IntrucaoContext.Provider >
	);
}

export default App;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 99vh;
`;

const TituloWrapper = styled.div`
	padding: 10px;	
`;

const Titulo = styled.label`
    font-family: impact;
    font-size: 35px;
    color: #777777;
`;

const ParteTopo = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #777777;
	height: 10%;
`;

const ParteBaixo = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
`;

const ParteDireita = styled.div`
	width: 35%;
	height: 100%;
	background-color: #CCCCCC;
`;

const ParteEsquerda = styled.div`
	width: 65%;
	height: 100%;
	background-color: #d3d3d3;
`;

const Linha = styled.div`
	border-right-width: 2px;
    border-right-style: solid;
	border-right-color: white;
	align-self: center;
	height: 50%;
`;