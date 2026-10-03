import {afterEach,describe,expect,it,vi} from 'vitest';
import {APARTMENT_COSTS_API_URL,getApartmentCosts} from './apartmentCosts';

const payload={ok:true,apartamento:{},custosAquisicao:{registros:[],total:0,totalPago:0},taxasObra:{registros:[],total:0,totalPago:0}};

describe('getApartmentCosts',()=>{
 afterEach(()=>vi.unstubAllGlobals());
 it('busca e retorna os dados da API',async()=>{const fetchMock=vi.fn().mockResolvedValue({ok:true,json:vi.fn().mockResolvedValue(payload)});vi.stubGlobal('fetch',fetchMock);await expect(getApartmentCosts()).resolves.toEqual(payload);expect(fetchMock).toHaveBeenCalledWith(APARTMENT_COSTS_API_URL,{method:'GET'})});
 it('rejeita respostas HTTP com erro',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:500}));await expect(getApartmentCosts()).rejects.toThrow('Falha na API: 500')});
 it('rejeita respostas sem sucesso',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:vi.fn().mockResolvedValue({...payload,ok:false})}));await expect(getApartmentCosts()).rejects.toThrow('Resposta inválida da API')});
});
