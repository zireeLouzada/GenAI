import {Building2,ChartNoAxesCombined,Menu,Moon,Sun,X} from 'lucide-react';
import {useEffect,useState} from 'react';
import {NavLink,Route,Routes} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard';
import {resolveTheme,THEME_STORAGE_KEY,type Theme} from './theme';

const initialTheme=():Theme=>resolveTheme(localStorage.getItem(THEME_STORAGE_KEY),window.matchMedia('(prefers-color-scheme: dark)').matches);

export default function App(){
 const [menu,setMenu]=useState(false),[theme,setTheme]=useState<Theme>(initialTheme);
 const dark=theme==='dark';
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem(THEME_STORAGE_KEY,theme)},[dark,theme]);
 const links=[['/',ChartNoAxesCombined,'Dashboard']] as const;
 return <div className="app"><aside className={menu?'sidebar open':'sidebar'}><div className="brand"><span><Building2/></span><div><strong>Meu Apê</strong><small>Controle financeiro</small></div></div><button className="close-menu" aria-label="Fechar menu" onClick={()=>setMenu(false)}><X/></button><nav>{links.map(([to,Icon,label])=><NavLink key={to} to={to} end onClick={()=>setMenu(false)}><Icon/>{label}</NavLink>)}</nav><div className="sidebar-foot"><span className="connection-status"><span className="status-dot"/>Google Sheets</span><button className="theme-toggle" type="button" aria-label={dark?'Ativar modo claro':'Ativar modo escuro'} onClick={()=>setTheme(dark?'light':'dark')}>{dark?<Sun/>:<Moon/>}</button></div></aside><main><button className="menu-button" aria-label="Abrir menu" onClick={()=>setMenu(true)}><Menu/></button><div className="content"><Routes><Route path="*" element={<Dashboard/>}/></Routes></div></main>{menu&&<div className="backdrop" onClick={()=>setMenu(false)}/>}</div>
}
