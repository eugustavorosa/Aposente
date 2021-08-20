import { parseISO } from "date-fns";
import React, { createContext, useState, useContext } from "react";

import sum from "../valores/sum";

const TransaçãoContext = createContext();

function ContextProvider({ children }) {
  const transaçõesInicio = [];
  const [transações, setTransações] = useState(transaçõesInicio);
  const [searchAtive, setSeatchActive] = useState(false);
  const [receitaSelected, setReceitaSelected] = useState(false);
  const [despesaSelected, setDespesaSelected] = useState(false);
  const [aporteSelected, setAporteSelected] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState({
    label: "Todas as categorias",
    value: 1,
    name: "plus",
  });

  ////////////////////////////////////////////////////////////////////////////// Plano de aposentadoria

  const [aporteMensal, setAporteMensal] = useState(100);
  const [mesesContribuição, setMesesContribuição] = useState(360);
  const [taxaJurosAnual, setTaxaJurosAnual] = useState(10);
  const [rendaPassiva, setRendaPassiva] = useState(1031.42);
  const [investimentoInicial, setInvestimentoInicial] = useState(0);
  const [patrimonioFinal, setPatrimonioFinal] = useState(206284.33);

  function valor(item) {
    return item.valor;
  }

  const valorTotalAporte = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => parseISO(item.dataTransação))
    .map(valor)
    .reduce(sum, 0);

  const patrimonio = investimentoInicial * 1 + valorTotalAporte * 1;

  /////////////////////////////////////////////////////////////////////////////////

  const [showButton, setShowButton] = useState(true);

  const [isSignedIn, setIsSignedIn] = useState(true);

  //////////////////////////////////////////////////////////// SETUP SCREEN

  const [rendaCheck, setRendaCheck] = useState(false);
  const [gastosCheck, setGastosCheck] = useState(false);
  const [planoCheck, setPlanoCheck] = useState(false);

  const [rendaMensal, setRendaMensal] = useState(0);

  const [facudadeValor, setFaculdadeValor] = useState(0);
  const [aluguelValor, setAluguelValor] = useState(0);
  const [aguaValor, setAguaValor] = useState(0);
  const [luzValor, setLuzValor] = useState(0);
  const [academiaValor, setAcademiaValor] = useState(0);
  const [celularValor, setCelularValor] = useState(0);
  const [limpezaValor, setLimpezaValor] = useState(0);
  const [internetValor, setInternetValor] = useState(0);

  ////////////////////////////////////////////////////////////

  return (
    <TransaçãoContext.Provider
      value={{
        //////////////////////////////////////////////////////////// TRANSAÇÕES
        transações,
        setTransações,
        searchAtive,
        setSeatchActive,
        receitaSelected,
        setReceitaSelected,
        despesaSelected,
        setDespesaSelected,
        aporteSelected,
        setAporteSelected,
        categoryFilter,
        setCategoryFilter,
        ///////////////////////////////////////////////////////////// PLANO DE APOSENTADORIA
        aporteMensal,
        setAporteMensal,
        mesesContribuição,
        setMesesContribuição,
        taxaJurosAnual,
        setTaxaJurosAnual,
        rendaPassiva,
        setRendaPassiva,
        investimentoInicial,
        setInvestimentoInicial,
        patrimonio,
        patrimonioFinal,
        setPatrimonioFinal,
        ////////////////////////////////////////////////////////////
        showButton,
        setShowButton,
        isSignedIn,
        setIsSignedIn,
        //////////////////////////////////////////////////////////// SETUP SCREEN
        rendaCheck,
        setRendaCheck,
        gastosCheck,
        setGastosCheck,
        planoCheck,
        setPlanoCheck,
        rendaMensal,
        setRendaMensal,
        facudadeValor,
        setFaculdadeValor,
        aluguelValor,
        setAluguelValor,
        aguaValor,
        setAguaValor,
        luzValor,
        setLuzValor,
        academiaValor,
        setAcademiaValor,
        celularValor,
        setCelularValor,
        limpezaValor,
        setLimpezaValor,
        internetValor,
        setInternetValor,
        ////////////////////////////////////////////////////////////
      }}
    >
      {children}
    </TransaçãoContext.Provider>
  );
}

export const useTransações = () => useContext(TransaçãoContext);

export default ContextProvider;
