import type {ApartmentCostsApiResponse} from '../types';

export const APARTMENT_COSTS_API_URL='https://script.google.com/macros/s/AKfycbz9GSnpWs9A-hhpALrV6fxxPW2zpVB0OW06L60NdtnX2Nf1ulyrLItoPtI3xan0QTu2Ug/exec';

export async function getApartmentCosts():Promise<ApartmentCostsApiResponse>{
 const response=await fetch(APARTMENT_COSTS_API_URL,{method:'GET'});
 if(!response.ok)throw new Error(`Falha na API: ${response.status}`);
 const data:unknown=await response.json();
 if(!isApartmentCostsResponse(data)||!data.ok)throw new Error('Resposta inválida da API');
 return data;
}

function isApartmentCostsResponse(value:unknown):value is ApartmentCostsApiResponse{
 if(!value||typeof value!=='object')return false;
 const data=value as Partial<ApartmentCostsApiResponse>;
 return typeof data.ok==='boolean'&&!!data.apartamento&&!!data.custosAquisicao&&Array.isArray(data.custosAquisicao.registros)&&!!data.taxasObra&&Array.isArray(data.taxasObra.registros);
}
