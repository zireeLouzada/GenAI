export const categories = {construction_fee:'Taxa de obra',registry:'Cartório / Registro',tax:'Impostos',bank_fee:'Tarifa bancária',documentation:'Documentação',property_appraisal:'Avaliação do imóvel',insurance:'Seguro',other:'Outros'} as const;
export type ExpenseCategory = keyof typeof categories;
export type Apartment={id:string;name:string;purchase_price:number;down_payment_amount:number;fgts_amount:number;original_financing_amount:number;current_financing_balance:number;purchase_date:string|null;created_at:string;updated_at:string};
export type Expense={id:string;apartment_id:string;category:ExpenseCategory;description:string;amount:number;paid_at:string;notes:string|null;source_type:'manual'|'spreadsheet';source_key:string|null;created_at:string;updated_at:string};
export type ApartmentInput=Omit<Apartment,'id'|'created_at'|'updated_at'>;
export type ExpenseInput=Omit<Expense,'id'|'created_at'|'updated_at'>;

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
