import {useCallback,useEffect,useMemo,useState} from 'react';
import {Building2,CalendarDays,ReceiptText,RefreshCw,TrendingDown,WalletCards} from 'lucide-react';
import {Bar,BarChart,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';
import {Button,Card,Skeleton} from '../components/ui';
import {compactBRL,dateBR,money,percentage} from '../lib';
import {getApartmentCosts} from '../services/apartmentCosts';
import type {ApartmentCostsApiResponse} from '../types';

const notInformed='Não informado';
const moneyOrFallback=(value:number|null)=>value===null?notInformed:money(value);
const dateOrFallback=(value:string|null)=>value?dateBR(value):notInformed;
const sumOrFallback=(...values:(number|null)[])=>values.every(value=>value===null)?null:values.reduce<number>((total,value)=>total+(value??0),0);

export function Dashboard(){
 const [data,setData]=useState<ApartmentCostsApiResponse|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(false);
 const load=useCallback(async()=>{setLoading(true);setError(false);try{setData(await getApartmentCosts())}catch{setError(true)}finally{setLoading(false)}},[]);
 useEffect(()=>{let active=true;getApartmentCosts().then(result=>{if(active)setData(result)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
 if(loading&&!data)return <Loading/>;
 if(error&&!data)return <ErrorState retry={load}/>;
 if(!data)return null;
 return <DashboardContent data={data} refreshing={loading} refresh={load} refreshFailed={error}/>;
}

function DashboardContent({data,refresh,refreshing,refreshFailed}:{data:ApartmentCostsApiResponse;refresh:()=>Promise<void>;refreshing:boolean;refreshFailed:boolean}){
 const {apartamento,custosAquisicao,taxasObra}=data;
 const grouped=[{label:'Aquisição',value:custosAquisicao.total??0},{label:'Taxas de obra',value:taxasObra.total??0}].filter(item=>item.value>0);
 const recent=useMemo(()=>[
  ...custosAquisicao.registros.map((item,index)=>({id:`a-${index}`,date:item.data,category:item.categoria??notInformed,description:item.descricao??notInformed,value:item.valor})),
  ...taxasObra.registros.map((item,index)=>({id:`o-${index}`,date:item.dataPagamento,category:'Taxa de obra',description:item.observacao??notInformed,value:item.valor})),
 ].sort((a,b)=>(b.date??'').localeCompare(a.date??'')).slice(0,5),[custosAquisicao.registros,taxasObra.registros]);
 const paidPercentage=apartamento.percentualJaPago===null?null:apartamento.percentualJaPago*100;
 const gaugeProgress=paidPercentage===null?0:Math.min(100,Math.max(0,paidPercentage));
 return <><header className="page-head"><div><p className="eyebrow">Visão geral</p><h1>Meu apartamento</h1><p>Acompanhe a evolução da sua maior conquista.</p>{refreshFailed&&<small className="form-error">Não foi possível atualizar os dados. Os últimos valores carregados continuam sendo exibidos.</small>}</div><div className="header-actions"><Button className="secondary" disabled={refreshing} onClick={()=>void refresh()}><RefreshCw/>{refreshing?'Atualizando…':'Atualizar dados'}</Button></div></header><section className="metric-grid"><Metric icon={<Building2/>} label="Valor do imóvel" value={moneyOrFallback(apartamento.valorTotalImovel)}/><Metric icon={<WalletCards/>} label="Já pago do imóvel" value={moneyOrFallback(apartamento.valorJaPago)} accent/><Metric icon={<TrendingDown/>} label="Saldo devedor" value={moneyOrFallback(apartamento.saldoDevedorCaixa)}/><Metric icon={<ReceiptText/>} label="Custos adicionais" value={moneyOrFallback(sumOrFallback(custosAquisicao.total,taxasObra.total))}/></section><section className="dashboard-grid"><Card className="gauge-card"><div><p className="eyebrow">Progresso de quitação</p><h2>Seu imóvel está cada vez mais perto</h2></div><div className="gauge" style={{'--progress':`${gaugeProgress*1.8}deg`} as React.CSSProperties}><div className="gauge-center"><strong>{paidPercentage===null?notInformed:percentage(paidPercentage)}</strong><span>do imóvel pago</span></div></div><div className="gauge-values"><div><span>Pago</span><strong>{moneyOrFallback(apartamento.valorJaPago)}</strong></div><div><span>Restante</span><strong>{moneyOrFallback(apartamento.saldoDevedorCaixa)}</strong></div></div></Card><Card><p className="eyebrow">Distribuição</p><h2>Gastos por categoria</h2>{grouped.length?<ResponsiveContainer width="100%" height={260}><BarChart data={grouped} layout="vertical" margin={{left:10,right:12,bottom:8}}><CartesianGrid horizontal={false} stroke="var(--border)"/><XAxis type="number" tickFormatter={compactBRL} tick={{fontSize:11,fill:'var(--muted-foreground)'}} axisLine={{stroke:'var(--border)'}} tickLine={false}/><YAxis type="category" dataKey="label" width={112} tick={{fontSize:11,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'var(--popover)',borderColor:'var(--border)',borderRadius:'var(--radius)',color:'var(--popover-foreground)'}} itemStyle={{color:'var(--popover-foreground)'}} formatter={value=>money(Number(value))}/><Bar dataKey="value" fill="var(--chart-1)" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer>:<Empty text="Nenhum gasto adicional registrado."/>}</Card></section><section className="bottom-grid"><Card><div className="card-title"><div><p className="eyebrow">Acompanhamento</p><h2>Taxas de obra</h2></div><CalendarDays/></div><p className="big-value">{moneyOrFallback(taxasObra.total)}</p><p className="muted">{taxasObra.registros.length} {taxasObra.registros.length===1?'cobrança registrada':'cobranças registradas'}</p></Card><Card className="recent"><div className="card-title"><div><p className="eyebrow">Movimentações</p><h2>Últimos gastos</h2></div></div>{recent.length?<div className="table-wrap"><table><thead><tr><th>Data</th><th>Categoria</th><th>Descrição</th><th>Valor</th></tr></thead><tbody>{recent.map(item=><tr key={item.id}><td>{dateOrFallback(item.date)}</td><td><span className="badge">{item.category}</span></td><td>{item.description}</td><td className="money">{moneyOrFallback(item.value)}</td></tr>)}</tbody></table></div>:<Empty text="Nenhum gasto adicional registrado."/>}</Card></section></>;
}

function Metric({icon,label,value,accent}:{icon:React.ReactNode;label:string;value:string;accent?:boolean}){return <Card className={accent?'metric accent':'metric'}><span className="metric-icon">{icon}</span><div><p>{label}</p><strong>{value}</strong></div></Card>}
const Empty=({text}:{text:string})=><div className="small-empty"><p>{text}</p></div>;
const ErrorState=({retry}:{retry:()=>Promise<void>})=><div className="empty"><h2>Não foi possível carregar os dados.</h2><p>Verifique sua conexão e tente novamente.</p><Button onClick={()=>void retry()}>Tentar novamente</Button></div>;
function Loading(){return <><Skeleton className="head-skeleton"/><div className="metric-grid">{[1,2,3,4].map(item=><Skeleton key={item} className="metric-skeleton"/>)}</div><div className="dashboard-grid"><Skeleton className="panel-skeleton"/><Skeleton className="panel-skeleton"/></div></>}
