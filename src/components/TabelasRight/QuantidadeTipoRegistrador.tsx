import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { PropsReserva, IntrucaoContext } from "../../App";
import { TipoRegistrador } from "../../Enums/TipoRegistrador";

const QuantidadeTipoRegistrador: React.FC = () => {
  const {
    ArrayDeEstacaoReserva: arrEstacaoReserva,
    ArrayTipoRegistrador: arrTipoRegistrador,
  } = useContext(IntrucaoContext);

  //@ts-ignore
  var groupBy = function (xs, key): {} {
    //@ts-ignore
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const onArrTipoRegistradorChanges = () => {
    const arrAux: PropsReserva[] = [];
    const arrayAgrupado = groupBy(arrTipoRegistrador.value, "TipoRegistrador");
    Object.keys(TipoRegistrador).forEach((tr) => {
      //@ts-ignore
      arrayAgrupado[tr].forEach((g) => {
        for (let i = 0; i < g.quantidade; i++) {
          arrAux.push({
            nome: `${g.TipoRegistrador}${i + 1}`,
            TipoRegistrador: g.TipoRegistrador,
            busy: false,
          });
        }
      });
    });
    arrEstacaoReserva.setValue([...arrAux]);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onArrTipoRegistradorChanges, [arrTipoRegistrador.value]);

  return (
    <Wrapper>
      <Titulo>Quantidade de Registradores</Titulo>
      {Object.keys(TipoRegistrador).map((i: any, ind: number) => (
        <Content key={"tipo-registrador-" + ind}>
          <Registrador>{i.toUpperCase()}</Registrador>
          <Input
            value={
              arrTipoRegistrador.findByStringId(i, "TipoRegistrador").quantidade
            }
            type="number"
            onChange={(e) => {
              if (Number(e.target.value) <= 0) return;
              arrTipoRegistrador.setValue([
                ...arrTipoRegistrador.value.map((cpi) => {
                  if (cpi.TipoRegistrador === i) {
                    cpi.quantidade = Number(e.target.value);
                  }
                  return cpi;
                }),
              ]);
            }}
          />
        </Content>
      ))}
    </Wrapper>
  );
};

export default QuantidadeTipoRegistrador;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Titulo = styled.label`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3px;
  align-items: center;
`;

const Registrador = styled.label`
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  width: 100px;
`;

const Input = styled.input`
  width: 80px;
  margin-right: 2px;
  padding: 8px;
`;
