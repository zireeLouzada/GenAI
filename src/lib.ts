import { clsx, type ClassValue } from 'clsx'; import {twMerge} from 'tailwind-merge';
export const cn=(...x:ClassValue[])=>twMerge(clsx(x));
export const money=(value:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value);
export const dateBR=(value:string)=>new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));
export const percentage=(value:number)=>`${new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(Math.min(100,Math.max(0,value)))}%`;
export const today=()=>new Date().toISOString().slice(0,10);
export function parseMoney(value:string){const normalized=value.trim().replace(/R\$\s?/g,'').replace(/\./g,'').replace(',','.'); return Number(normalized)}
