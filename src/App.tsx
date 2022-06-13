import React, { useState } from 'react';
import styled from 'styled-components';
import { useArray, UseArrayActions } from './hooks/useArray';
import { TipoInstrucao } from './Enums/TipoInstrucao';
import { TipoRegistrador } from './Enums/TipoRegistrador';
import RightScreen from './screen/RightScreen/RightScreen';
import LeftScreen from './screen/LeftScreen/LeftScreen';
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
			<WrapperSiderContent>
				<div className='parte-topo'>
					<BotoesConfimarResetar />
					<div className='linha'></div>
					<AvancarInstrucoes />
					<InputInstrucoes />
				</div>
				<div className='parte-baixo'>
					<div className='parte-esquerda'>
						<LeftScreen />
					</div>
					<div className='parte-direita'>
						<RightScreen />
					</div>
				</div>
			</WrapperSiderContent>
		</IntrucaoContext.Provider >
	);
}

export default App;


const WrapperSiderContent = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 99vh;
	
	.linha{
		border-right-width: 2px;
        border-right-style: solid;
		border-right-color: white;
	}

	.parte-topo{
		display: flex;
		flex-direction: row;
		background-color: #777777;
		padding: 20px;
	}
	.parte-baixo{
		display: flex;
		flex: 1;
		flex-direction: row;
	}
	.parte-direita{
		width: 35%;
		height: 100%;
		background-color: #CCCCCC;
	}
	.parte-esquerda{
		width: 65%;
		height: 100%;
		background-color: #d3d3d3;
	}
`;