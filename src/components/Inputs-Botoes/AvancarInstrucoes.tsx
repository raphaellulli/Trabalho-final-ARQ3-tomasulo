import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IEstacaoReserva, IInstrucoes, IntrucaoContext, IRegistrador } from '../../App';
import { TipoRegistrador } from '../../Enums/TipoRegistrador';

const AvancarInstrucoes: React.FC = () => {
    const arrInstrucoesConfirmadas = useRef<IInstrucoes[]>([]);
    const {
        arrRegistrador,
        arrCicloPorInstrucao,
        arrEstacaoReserva,
        arrInstrucoes,
        confirmado,
        cicloAtual,
        setCicloAtual,
        arrBufferReordenamento,
        tamnhoBuffer,
    } = useContext(IntrucaoContext);

    const avancarInstrucoes = () => {

        const instrucaoAtual = arrInstrucoesConfirmadas.current.shift();
        let estacaoReservaVazia: IEstacaoReserva | undefined = undefined;

        if (!instrucaoAtual && arrInstrucoes.value.every(i => i.escrita === true) && arrEstacaoReserva.value.every(e => e.ocupada === false)) {
            alert("Fim do ciclo!");
            return;
        }
        const arrBufferAux = arrBufferReordenamento.value;
        setCicloAtual(cicloAtual + 1);
        const arrRegParaAtualizar: IRegistrador[] = [];
        const arrAuxER = arrEstacaoReserva.value.sort((a, b) => (a.Ciclos ?? 0) - (b.Ciclos ?? 0)).map(er => {
            if (er.ocupada) {
                const indiceInstrucaoNoBuffer = arrBufferAux.findIndex(b => b.idInstrucao === er.idInstrucao);
                let canCommit = true;
                arrBufferAux.forEach((b, ind) => {
                    if (ind < indiceInstrucaoNoBuffer) {
                        const i = arrInstrucoes.value.find(i => i.id === b.idInstrucao)
                        if (i && !i.commited) {
                            canCommit = false;
                        }
                    }
                });

                if (er.Ciclos === 1
                    && (er.Vj && er.Vk)
                    && er.TipoRegistrador !== TipoRegistrador.Load
                    && er.TipoRegistrador !== TipoRegistrador.Store
                    && er.idInstrucao !== estacaoReservaVazia?.idInstrucao
                ) {
                    er.A = `${er.Vj} + ${er.Vk}`;
                    er.Vj = undefined;
                    er.Vk = undefined;
                    er.Ciclos = er.Ciclos - 1;
                }
                else if (er.Ciclos === 0 && canCommit) {
                    const registradorNome =
                        er.destino?.startsWith('F') ?
                            er.destino :
                            arrInstrucoes.value.find(i => i.id === arrBufferAux[Number(er.destino) - 1].idInstrucao)!.entrada1;
                    const registradorValor = er.destino!;//`${er.nome}_${er.A!}`;
                    er.ocupada = false;
                    er.operacao = undefined;
                    er.Ciclos = undefined;
                    er.A = undefined;
                    er.Vj = undefined;
                    er.Vk = undefined;
                    er.Qj = undefined;
                    er.Qk = undefined;
                    er.destino = undefined;
                    er.idInstrucao = undefined;
                    er.registradorSendoUtilizado = undefined;

                    if (er.TipoRegistrador !== TipoRegistrador.Store) {
                        const regToEdit = arrRegistrador.findByStringId(registradorNome, "nome");
                        regToEdit.valor = registradorValor;
                        arrRegParaAtualizar.push(regToEdit);
                    }
                }
                else {
                    if (((er.Vj && er.Vk) || (er.TipoRegistrador === TipoRegistrador.Load || er.TipoRegistrador === TipoRegistrador.Store))) {
                        if (instrucaoAtual?.id !== er.idInstrucao) {
                            //@ts-expect-error
                            er.Ciclos = er.Ciclos - 1;
                        }
                    }
                    else {
                        const qj = arrBufferAux[Number(er.Qj) - 1];
                        const instQj = arrInstrucoes.value.find(i => i.id === qj?.idInstrucao);
                        if (instQj?.escrita) {
                            er.Vj = er.Qj;
                            er.Qj = undefined;
                        }
                        const qk = arrBufferAux[Number(er.Qk) - 1];
                        const instQk = arrInstrucoes.value.find(i => i.id === qk?.idInstrucao);
                        if (instQk?.escrita) {
                            er.Vj = er.Qj;
                            er.Qj = undefined;
                        }
                    }
                }
            }
            else if (estacaoReservaVazia && er.nome === estacaoReservaVazia.nome) {
                er = estacaoReservaVazia;
            }
            return er;
        })
        if (instrucaoAtual !== undefined && arrBufferReordenamento.length < tamnhoBuffer) {
            if (!arrBufferAux.find(b => b.idInstrucao === instrucaoAtual.id))
                arrBufferAux.push({
                    idInstrucao: instrucaoAtual.id,
                })
            if (instrucaoAtual.nome === 'Add' || instrucaoAtual.nome === "Sub") {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Inteiro && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Mul') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Flutuante && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Ldr') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Load && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Str') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Store && !er.ocupada);
            }

            if (estacaoReservaVazia !== undefined) {
                if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Load) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Store) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Inteiro) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2) + 1).toString() || er.destino === instrucaoAtual.entrada2));
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3) + 1).toString() || er.destino === instrucaoAtual.entrada3));
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt2.idInstrucao) + 1).toString() //`${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2)).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vj = estacaoReservaVazia.Vj === '-1' ? instrucaoAtual.entrada2 : estacaoReservaVazia.Vj + 1;
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt3.idInstrucao) + 1).toString() //`${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3)).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vk = estacaoReservaVazia.Vk === '-1' ? instrucaoAtual.entrada3 : estacaoReservaVazia.Vk + 1;
                    }
                }
                else {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2) + 1).toString() || er.destino === instrucaoAtual.entrada2));
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3) + 1).toString() || er.destino === instrucaoAtual.entrada3));
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt2.idInstrucao) + 1).toString() //`${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vj = estacaoReservaVazia.Vj === '-1' ? instrucaoAtual.entrada2 : estacaoReservaVazia.Vj + 1;
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt3.idInstrucao) + 1).toString() //`${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vk = estacaoReservaVazia.Vk === '-1' ? instrucaoAtual.entrada3 : estacaoReservaVazia.Vk + 1;
                    }
                }
            }
            else {
                arrInstrucoesConfirmadas.current = [...[instrucaoAtual], ...arrInstrucoesConfirmadas.current];
            }
        }

        arrInstrucoes.setValue([...arrInstrucoes.value.map(i => {
            const instER = arrAuxER.find(e => e.idInstrucao === i.id);
            if (!i.enviada && arrBufferAux.find(b => b.idInstrucao === i.id)) {
                i.enviada = true;
            }
            if (instER) {
                i.enviada = true;
                if ((instER.Vj && instER.Vk) || instER.A !== undefined) {
                    i.executada = true;
                }
                if (instER.A !== undefined) {
                    i.escrita = true;
                }
            }
            else if (!instER && i.escrita) {
                i.commited = true;
            }

            return i;
        })])
        arrRegistrador.setValue([...arrRegistrador.value.map(r => {
            const regAttAtual = arrRegParaAtualizar.find(regAtt => regAtt.nome === r.nome);
            if (regAttAtual) {
                r.valor = regAttAtual.valor;
            }
            return r;
        })])
        arrBufferReordenamento.setValue([...arrBufferAux]);
        arrEstacaoReserva.setValue([...arrAuxER]);
    }

    const onStart = () => {
        if (cicloAtual === 0 && confirmado) {
            arrInstrucoesConfirmadas.current = [...arrInstrucoes.value];
        }
        else if (!confirmado) {
            arrInstrucoesConfirmadas.current = [];
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onStart, [confirmado, cicloAtual])

    return (
        <Wrapper>
            <button
                className='myButton'
                onClick={avancarInstrucoes}
                disabled={!confirmado}
            >
                Avançar
            </button>
            <div
                className='ciclo'
            >
                CICLO - {cicloAtual}
            </div>
        </Wrapper >
    );
}

export default AvancarInstrucoes;

const Wrapper = styled.div`
    display: flex;
	flex-direction: row;
	flex: 1;
    align-items: center;
	justify-content: flex-start;
    text-align: center;
    margin-left: 15px;

    .ciclo {
        display: flex;
	    flex: 1;
        font-family: impact;
        font-size: 30px;
        color: #dfdfdf;
    }
    .myButton {
        box-shadow: inset 0px 1px 0px 0px #ffffff;
        background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color: #ededed;
        border-radius: 6px;
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
        margin-right: 15px;
    }
    .myButton:hover{
	    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	    background-color: #dfdfdf;
    }
    .myButton:active{
	    position: relative;
	    top: 1px;
    }
`;
