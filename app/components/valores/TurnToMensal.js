import { addMonths } from "date-fns";

const turnToMensal = (transação) => {
  const transação1 = {
    id: transação.id + "+",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 1),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação2 = {
    id: transação.id + "++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 2),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação3 = {
    id: transação.id + "+++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 3),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação4 = {
    id: transação.id + "++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 4),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação5 = {
    id: transação.id + "+++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 5),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação6 = {
    id: transação.id + "++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 6),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação7 = {
    id: transação.id + "+++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 7),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação8 = {
    id: transação.id + "++++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 8),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação9 = {
    id: transação.id + "+++++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 9),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação10 = {
    id: transação.id + "++++++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 10),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transação11 = {
    id: transação.id + "+++++++++++",
    title: transação.title,
    valor: transação.valor,
    dataTransação: addMonths(transação.dataTransação, 11),
    nameIcon: transação.nameIcon,
    category: transação.category,
    tipoTransação: transação.tipoTransação,
    isMensal: true,
  };
  const transaçãoMensal = [
    transação1,
    transação2,
    transação3,
    transação4,
    transação5,
    transação6,
    transação7,
    transação8,
    transação9,
    transação10,
    transação11,
  ];

  return transaçãoMensal;
};

export default turnToMensal;
