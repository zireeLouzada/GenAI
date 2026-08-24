export const categories = {construction_fee:'Taxa de obra',registry:'Cartório / Registro',tax:'Impostos',bank_fee:'Tarifa bancária',documentation:'Documentação',property_appraisal:'Avaliação do imóvel',insurance:'Seguro',other:'Outros'} as const;
export type ExpenseCategory = keyof typeof categories;
export type Apartment={id:string;name:string;purchase_price:number;down_payment_amount:number;fgts_amount:number;original_financing_amount:number;current_financing_balance:number;purchase_date:string|null;created_at:string;updated_at:string};
export type Expense={id:string;apartment_id:string;category:ExpenseCategory;description:string;amount:number;paid_at:string;notes:string|null;created_at:string;updated_at:string};
export type ApartmentInput=Omit<Apartment,'id'|'created_at'|'updated_at'>;
export type ExpenseInput=Omit<Expense,'id'|'created_at'|'updated_at'>;
