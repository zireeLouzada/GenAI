import type {ButtonHTMLAttributes,HTMLAttributes,InputHTMLAttributes,SelectHTMLAttributes,TextareaHTMLAttributes} from 'react'; import {cn} from '../lib';
export const Button=({className,...p}:ButtonHTMLAttributes<HTMLButtonElement>)=><button className={cn('button',className)} {...p}/>;
export const Card=({className,...p}:HTMLAttributes<HTMLDivElement>)=><div className={cn('card',className)} {...p}/>;
export const Input=({className,...p}:InputHTMLAttributes<HTMLInputElement>)=><input className={cn('input',className)} {...p}/>;
export const Select=({className,...p}:SelectHTMLAttributes<HTMLSelectElement>)=><select className={cn('input',className)} {...p}/>;
export const Textarea=({className,...p}:TextareaHTMLAttributes<HTMLTextAreaElement>)=><textarea className={cn('input textarea',className)} {...p}/>;
export const Skeleton=({className}: {className?:string})=><div className={cn('skeleton',className)}/>;
export const Field=({label,error,children}:{label:string,error?:string;children:React.ReactNode})=><label className="field"><span>{label}</span>{children}{error&&<small className="error">{error}</small>}</label>;
