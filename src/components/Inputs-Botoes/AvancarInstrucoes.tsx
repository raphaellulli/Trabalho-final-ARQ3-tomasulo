import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  PropsReserva,
  PropsInstrucoes,
  IntrucaoContext,
  PropsRegistrador,
} from "../../App";
import { TipoRegistrador } from "../../Enums/TipoRegistrador";

const AvancarInstrucoes: React.FC = () => {
  const arrInstrucoesConfirmadas = useRef<PropsInstrucoes[]>([]);
  const {
    ArrayDeRegistrador: arrRegistrador,
    ArrayDeCiclodeInstrucao: arrCicloPorInstrucao,
    ArrayDeEstacaoReserva: arrEstacaoReserva,
    ArrayDeInstrucoes: arrInstrucoes,
    confirmado,
    cicloAtual,
    setCicloAtual,
    ArrayDeReordenamentoDeBuffer: arrBufferReordenamento,
    tamnhoBuffer,
  } = useContext(IntrucaoContext);

  const avancarInstrucoes = () => {
    const instrucaoAtual = arrInstrucoesConfirmadas.current.shift();
    let estacaoReservaVazia: PropsReserva | undefined = undefined;

    if (
      !instrucaoAtual &&
      arrInstrucoes.value.every((i) => i.escrita === true) &&
      arrEstacaoReserva.value.every((e) => e.busy === false)
    ) {
      alert("Ciclos finalizados!");
      return;
    }

    const arrBufferAux = arrBufferReordenamento.value;
    setCicloAtual(cicloAtual + 1);
    const arrRegParaAtualizar: PropsRegistrador[] = [];
    const arrInstrucoesParaDescartar: string[] = [];
    const arrAuxER = arrEstacaoReserva.value
      .sort((a, b) => (a.Ciclos ?? 0) - (b.Ciclos ?? 0))
      .map((er) => {
        const aux = arrInstrucoes.value.find((i) => i.id === er.idInstrucao);
        if (aux && aux.lixo) {
          er.busy = false;
          er.operacao = undefined;
          er.Ciclos = undefined;
          er.A = undefined;
          er.VJ = undefined;
          er.VK = undefined;
          er.QJ = undefined;
          er.QK = undefined;
          er.destino = undefined;
          er.idInstrucao = undefined;
          er.registradorSendoUtilizado = undefined;
        } else if (er.busy) {
          const indiceInstrucaoNoBuffer = arrBufferAux.findIndex(
            (b) => b.idInstrucao === er.idInstrucao
          );
          let canCommit = true;
          arrBufferAux.forEach((b, ind) => {
            if (ind < indiceInstrucaoNoBuffer) {
              const i = arrInstrucoes.value.find((i) => i.id === b.idInstrucao);
              if (i && !i.commitada) {
                canCommit = false;
              }
            }
          });
          if (er.TipoRegistrador === "Jump" && er.Ciclos !== 0) {
            const inst = arrInstrucoes.value.find(
              (i) => i.id === er.idInstrucao
            );
            if (inst) {
              const indexInst = arrInstrucoesConfirmadas.current.findIndex(
                (e) => e.id === inst.id
              );
              const timestamp = Math.round(new Date().getTime() / 1000);
              if (timestamp % 2 === Number(inst.input2)) {
                arrInstrucoes.value
                  .slice(indexInst - 1)
                  .forEach((i) => arrInstrucoesParaDescartar.push(i.id));
                alert(
                  "Instruções foram descartadas!\nValor do Jump foi confirmado."
                );
              }
            }
            er.Ciclos = 0;
          } else if (
            er.Ciclos === 1 &&
            er.VJ &&
            er.VK &&
            er.TipoRegistrador !== TipoRegistrador.Load &&
            er.TipoRegistrador !== TipoRegistrador.Store &&
            er.idInstrucao !== estacaoReservaVazia?.idInstrucao
          ) {
            er.A = `${er.VJ} + ${er.VK}`;
            er.VJ = undefined;
            er.VK = undefined;
            er.Ciclos = er.Ciclos - 1;
          } else if (er.Ciclos === 0 && canCommit) {
            const registradorNome = er.destino?.startsWith("F")
              ? er.destino
              : arrInstrucoes.value.find(
                  (i) =>
                    i.id === arrBufferAux[Number(er.destino) - 1].idInstrucao
                )!.input1;
            const registradorValor = er.destino!;
            er.busy = false;
            er.operacao = undefined;
            er.Ciclos = undefined;
            er.A = undefined;
            er.VJ = undefined;
            er.VK = undefined;
            er.QJ = undefined;
            er.QK = undefined;
            er.destino = undefined;
            er.idInstrucao = undefined;
            er.registradorSendoUtilizado = undefined;

            if (
              er.TipoRegistrador !== TipoRegistrador.Store &&
              er.TipoRegistrador !== TipoRegistrador.Jump
            ) {
              const regToEdit = arrRegistrador.findByStringId(
                registradorNome,
                "nome"
              );
              regToEdit.valor = registradorValor;
              arrRegParaAtualizar.push(regToEdit);
            }
          } else {
            if (
              (er.VJ && er.VK) ||
              er.TipoRegistrador === TipoRegistrador.Load ||
              er.TipoRegistrador === TipoRegistrador.Store
            ) {
              if (instrucaoAtual?.id !== er.idInstrucao) {
                //@ts-expect-error
                er.Ciclos = er.Ciclos - 1;
              }
            } else {
              const qj = arrBufferAux[Number(er.QJ) - 1];
              const instQj = arrInstrucoes.value.find(
                (i) => i.id === qj?.idInstrucao
              );
              if (instQj?.escrita) {
                er.VJ = er.QJ;
                er.QJ = undefined;
              }
              const qk = arrBufferAux[Number(er.QK) - 1];
              const instQk = arrInstrucoes.value.find(
                (i) => i.id === qk?.idInstrucao
              );
              if (instQk?.escrita) {
                er.VJ = er.QJ;
                er.QJ = undefined;
              }
            }
          }
        } else if (
          estacaoReservaVazia &&
          er.nome === estacaoReservaVazia.nome
        ) {
          er = estacaoReservaVazia;
        }
        return er;
      });
    const aux = arrInstrucoes.value.some(
      (i) => i.id === instrucaoAtual?.id && i.lixo
    );
    if (
      instrucaoAtual !== undefined &&
      !aux &&
      arrBufferReordenamento.length < tamnhoBuffer
    ) {
      if (!arrBufferAux.find((b) => b.idInstrucao === instrucaoAtual.id))
        arrBufferAux.push({
          idInstrucao: instrucaoAtual.id,
        });
      if (instrucaoAtual.nome === "Add" || instrucaoAtual.nome === "Sub") {
        estacaoReservaVazia = arrEstacaoReserva.value.find(
          (er) => er.TipoRegistrador === TipoRegistrador.Inteiro && !er.busy
        );
      } else if (
        instrucaoAtual.nome === "Mult" ||
        instrucaoAtual.nome === "Div"
      ) {
        estacaoReservaVazia = arrEstacaoReserva.value.find(
          (er) => er.TipoRegistrador === TipoRegistrador.Flutuante && !er.busy
        );
      } else if (instrucaoAtual.nome === "Ld") {
        estacaoReservaVazia = arrEstacaoReserva.value.find(
          (er) => er.TipoRegistrador === TipoRegistrador.Load && !er.busy
        );
      } else if (instrucaoAtual.nome === "St") {
        estacaoReservaVazia = arrEstacaoReserva.value.find(
          (er) => er.TipoRegistrador === TipoRegistrador.Store && !er.busy
        );
      } else if (instrucaoAtual.nome === "Jump") {
        estacaoReservaVazia = arrEstacaoReserva.value.find(
          (er) => er.TipoRegistrador === TipoRegistrador.Jump && !er.busy
        );
      }

      if (estacaoReservaVazia !== undefined) {
        estacaoReservaVazia.busy = true;
        estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
        estacaoReservaVazia.operacao = instrucaoAtual.nome;
        estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(
          (cpi) =>
            cpi.TipoInstrucao.toUpperCase() ===
            instrucaoAtual.nome.toLocaleUpperCase()
        )?.quantidade;
        const destinoIndex = arrBufferAux.findIndex(
          (b) => b.idInstrucao === instrucaoAtual.input1
        );
        estacaoReservaVazia.destino =
          destinoIndex !== -1
            ? (destinoIndex + 1).toString()
            : instrucaoAtual.input1;
        if (
          estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Load ||
          estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Store ||
          estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Jump
        ) {
          estacaoReservaVazia.A = `${instrucaoAtual.input2}${
            instrucaoAtual.input3 ? " + (" + instrucaoAtual.input3 + ")" : ""
          }`;
          estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.input3;
        } else if (
          estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Inteiro ||
          estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Flutuante
        ) {
          const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(
            (er) =>
              er.busy &&
              (er.destino ===
                (
                  arrBufferAux.findIndex(
                    (b) => b.idInstrucao === instrucaoAtual.input2
                  ) + 1
                ).toString() ||
                er.destino === instrucaoAtual.input2)
          );
          const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(
            (er) =>
              er.busy &&
              (er.destino ===
                (
                  arrBufferAux.findIndex(
                    (b) => b.idInstrucao === instrucaoAtual.input3
                  ) + 1
                ).toString() ||
                er.destino === instrucaoAtual.input3)
          );
          if (
            estacaoPendenteEnt2 &&
            !arrInstrucoes.value.find(
              (i) => i.id === estacaoPendenteEnt2.idInstrucao
            )?.escrita
          ) {
            estacaoReservaVazia.QJ = (
              arrBufferAux.findIndex(
                (b) => b.idInstrucao === estacaoPendenteEnt2.idInstrucao
              ) + 1
            ).toString();
          } else {
            estacaoReservaVazia.VJ = arrBufferAux
              .findIndex((b) => b.idInstrucao === instrucaoAtual.input2)
              .toString();
            estacaoReservaVazia.VJ =
              estacaoReservaVazia.VJ === "-1"
                ? instrucaoAtual.input2
                : estacaoReservaVazia.VJ + 1;
          }
          if (
            estacaoPendenteEnt3 &&
            !arrInstrucoes.value.find(
              (i) => i.id === estacaoPendenteEnt3.idInstrucao
            )?.escrita
          ) {
            estacaoReservaVazia.QK = (
              arrBufferAux.findIndex(
                (b) => b.idInstrucao === estacaoPendenteEnt3.idInstrucao
              ) + 1
            ).toString();
          } else {
            estacaoReservaVazia.VK = arrBufferAux
              .findIndex((b) => b.idInstrucao === instrucaoAtual.input3)
              .toString();
            estacaoReservaVazia.VK =
              estacaoReservaVazia.VK === "-1"
                ? instrucaoAtual.input3
                : estacaoReservaVazia.VK + 1;
          }
        }
      } else {
        arrInstrucoesConfirmadas.current = [
          ...[instrucaoAtual],
          ...arrInstrucoesConfirmadas.current,
        ];
      }
    }

    arrInstrucoesConfirmadas.current = arrInstrucoesConfirmadas.current.filter(
      (i) => !arrInstrucoesParaDescartar.includes(i.id)
    );
    arrInstrucoes.setValue([
      ...arrInstrucoes.value.map((i) => {
        const instER = arrAuxER.find((e) => e.idInstrucao === i.id);
        if (arrInstrucoesParaDescartar.includes(i.id)) {
          i.lixo = true;
          i.commitada = false;
          i.enviada = false;
          i.resultado = false;
          i.escrita = false;
          return i;
        }
        if (!i.enviada && arrBufferAux.find((b) => b.idInstrucao === i.id)) {
          i.enviada = true;
        }
        if (instER) {
          i.enviada = true;
          if ((instER.VJ && instER.VK) || instER.A !== undefined) {
            i.resultado = true;
          }
          if (instER.A !== undefined) {
            i.escrita = true;
          }
        } else if (!instER && i.escrita) {
          i.commitada = true;
        }

        return i;
      }),
    ]);
    arrRegistrador.setValue([
      ...arrRegistrador.value.map((r) => {
        const regAttAtual = arrRegParaAtualizar.find(
          (regAtt) => regAtt.nome === r.nome
        );
        if (regAttAtual) {
          r.valor = regAttAtual.valor;
        }
        return r;
      }),
    ]);
    arrBufferReordenamento.setValue([
      ...arrBufferAux.filter(
        (b) => !arrInstrucoesParaDescartar.includes(b.idInstrucao)
      ),
    ]);
    arrEstacaoReserva.setValue([...arrAuxER]);
  };

  const onStart = () => {
    if (cicloAtual === 0 && confirmado) {
      arrInstrucoesConfirmadas.current = [...arrInstrucoes.value];
    } else if (!confirmado) {
      arrInstrucoesConfirmadas.current = [];
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onStart, [confirmado, cicloAtual]);

  return (
    <Wrapper>
      <button
        className="myButton"
        onClick={avancarInstrucoes}
        disabled={!confirmado}
      >
        Próximo
      </button>
      <Ciclo>CICLO - {cicloAtual}</Ciclo>
    </Wrapper>
  );
};

export default AvancarInstrucoes;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  margin-left: 15px;
  margin-right: 15px;

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
  .myButton:hover {
    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
    background-color: #dfdfdf;
  }
  .myButton:active {
    position: relative;
    top: 1px;
  }
`;

const Ciclo = styled.div`
  display: flex;
  flex: 1;
  font-family: impact;
  font-size: 30px;
  color: #dfdfdf;
`;
