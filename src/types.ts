export interface ApartmentCostsApiResponse {
  ok: boolean;
  apartamento: ApartmentCostsApartment;
  custosAquisicao: AcquisitionCosts;
  taxasObra: ConstructionFees;
}

export interface ApartmentCostsApartment {
  entradaRecursosProprios: number | null;
  fgtsUtilizado: number | null;
  saldoDevedorCaixa: number | null;
  valorTotalImovel: number | null;
  valorJaPago: number | null;
  percentualJaPago: number | null;
  percentualFinanciado: number | null;
  valorContrato: number | null;
  valorAvaliacaoCaixa: number | null;
  valorFinanciadoOriginalmente: number | null;
  dataCompra: string | null;
  prazoFinanciamentoMeses: number | null;
  taxaJurosFinanciamento: number | null;
}

export interface AcquisitionCostRecord {
  data: string | null;
  categoria: string | null;
  descricao: string | null;
  valor: number | null;
  formaOrigem: string | null;
  status: string | null;
}

export interface AcquisitionCosts {
  registros: AcquisitionCostRecord[];
  total: number | null;
  totalPago: number | null;
}

export interface ConstructionFeeRecord {
  competencia: string | null;
  dataPagamento: string | null;
  valor: number | null;
  saldoDevedorInformado: number | null;
  percentualObra: number | null;
  observacao: string | null;
  status: string | null;
}

export interface ConstructionFees {
  registros: ConstructionFeeRecord[];
  total: number | null;
  totalPago: number | null;
}
