import React, { useContext } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../../App";
import { TipoInstrucao } from "../../Enums/TipoInstrucao";
import { TipoRegistrador } from "../../Enums/TipoRegistrador";

const BotoesConfimarResetar: React.FC = () => {
  const {
    arrInstrucoes,
    arrCicloPorInstrucao,
    arrTipoRegistrador,
    arrRegistrador,
    setQuantidadeInstrucoes,
    arrEstacaoReserva,
    setConfirmado,
    setCicloAtual,
    arrBufferReordenamento,
  } = useContext(IntrucaoContext);

  const onCliqueConfirmar = () => {
    if (arrInstrucoes.value.length <= 0) {
      alert("Não existe nenhuma instrução");
      return;
    }

    let ehValido = true;

    arrInstrucoes.value.forEach((i) => {
      if (
        (i.nome === TipoInstrucao.Add ||
          i.nome === TipoInstrucao.Sub ||
          i.nome === TipoInstrucao.Mult ||
          i.nome === TipoInstrucao.Ld ||
          i.nome === TipoInstrucao.Ld) &&
        (!i.entrada1 || !i.entrada2 || !i.entrada3)
      ) {
        ehValido = false;
      }
    });

    if (!ehValido) {
      alert(`Preencha todas as instruções!`);
      return;
    }

    arrInstrucoes.setValue([
      ...arrInstrucoes.value.map((i) => {
        i.enviada = false;
        i.escrita = false;
        i.executada = false;
        i.commited = false;
        return i;
      }),
    ]);
    arrRegistrador.setValue([
      ...new Array(16)
        .fill({ nome: "", valor: "" })
        .map((i, ind) => ({ nome: `F${ind}`, valor: "" })),
    ]);
    arrEstacaoReserva.setValue([
      ...arrEstacaoReserva.value.map((er) => {
        er.A = undefined;
        er.Ciclos = undefined;
        er.ocupada = false;
        er.operacao = undefined;
        er.registradorSendoUtilizado = undefined;
        er.Vj = undefined;
        er.Vk = undefined;
        er.destino = undefined;
        er.Qj = undefined;
        er.Qk = undefined;
        er.idInstrucao = undefined;
        return er;
      }),
    ]);
    setCicloAtual(0);
    arrBufferReordenamento.setValue([]);
    setConfirmado(true);
  };

  const onCliqueResetar = () => {
    setConfirmado(false);
    setCicloAtual(0);
    setQuantidadeInstrucoes(1);
    arrRegistrador.setValue([
      ...new Array(16)
        .fill({ nome: "", valor: "" })
        .map((i, ind) => ({ nome: `F${ind}`, valor: "" })),
    ]);
    arrTipoRegistrador.setValue(
      Object.keys(TipoRegistrador).map((i: any) => {
        return {
          quantidade: 1,
          TipoRegistrador: i,
        };
      })
    );
    arrCicloPorInstrucao.setValue(
      Object.keys(TipoInstrucao).map((i: any) => {
        return {
          quantidade: 1,
          TipoInstrucao: i,
        };
      })
    );
    const instrucaoDefault = arrInstrucoes.value[0];
    instrucaoDefault.nome = "Add";
    instrucaoDefault.entrada1 = "";
    instrucaoDefault.entrada2 = "";
    instrucaoDefault.entrada3 = undefined;
    instrucaoDefault.enviada = false;
    instrucaoDefault.executada = false;
    instrucaoDefault.escrita = false;
    arrInstrucoes.setValue([...[instrucaoDefault]]);
    arrBufferReordenamento.setValue([]);
  };

  return (
    <Wrapper>
      <Container>
        <div>
          <button
            className="myButton"
            style={{ marginRight: "15px" }}
            onClick={() => onCliqueConfirmar()}
          >
            Confirmar
          </button>
        </div>
        <div>
          <button className="myButton" onClick={() => onCliqueResetar()}>
            Resetar
          </button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default BotoesConfimarResetar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;
