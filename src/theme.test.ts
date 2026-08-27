import {describe,expect,it} from 'vitest';
import {resolveTheme} from './theme';

describe('preferência de tema',()=>{
 it('restaura uma preferência salva',()=>{expect(resolveTheme('dark',false)).toBe('dark');expect(resolveTheme('light',true)).toBe('light')});
 it('usa a preferência do sistema sem valor salvo',()=>{expect(resolveTheme(null,true)).toBe('dark');expect(resolveTheme(null,false)).toBe('light')});
 it('ignora valores persistidos inválidos',()=>expect(resolveTheme('sepia',true)).toBe('dark'));
});
