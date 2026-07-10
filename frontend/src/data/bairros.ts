export interface Bairro {
  nome: string
  municipio: string
  tipo: 'bairro' | 'zona' | 'municipio'
  tags?: string[]
}

export const bairrosAngolanos: Bairro[] = [
  // Luanda
  { nome: 'Benfica', municipio: 'Luanda', tipo: 'bairro', tags: ['ben', 'residencial'] },
  { nome: 'Talatona', municipio: 'Luanda', tipo: 'bairro', tags: ['tal', 'luxo'] },
  { nome: 'Camama', municipio: 'Luanda', tipo: 'bairro', tags: ['cam'] },
  { nome: 'Golf 1', municipio: 'Luanda', tipo: 'bairro', tags: ['golf', 'gol'] },
  { nome: 'Golf 2', municipio: 'Luanda', tipo: 'bairro', tags: ['golf', 'gol'] },
  { nome: 'Golf Jardim', municipio: 'Luanda', tipo: 'bairro', tags: ['golf', 'gol'] },
  { nome: 'Kilamba', municipio: 'Luanda', tipo: 'bairro', tags: ['kil'] },
  { nome: 'Zango', municipio: 'Luanda', tipo: 'bairro', tags: ['zan'] },
  { nome: 'Rocha Pinto', municipio: 'Luanda', tipo: 'bairro', tags: ['roc'] },
  { nome: 'Sapú', municipio: 'Luanda', tipo: 'bairro', tags: ['sap'] },
  { nome: 'Patriota', municipio: 'Luanda', tipo: 'bairro', tags: ['pat'] },
  { nome: 'Viana', municipio: 'Luanda', tipo: 'bairro', tags: ['via'] },
  { nome: 'Alvalade', municipio: 'Luanda', tipo: 'bairro', tags: ['alv'] },
  { nome: 'Maianga', municipio: 'Luanda', tipo: 'bairro', tags: ['mai'] },
  { nome: 'Ingombota', municipio: 'Luanda', tipo: 'bairro', tags: ['ing'] },
  { nome: 'Maculusso', municipio: 'Luanda', tipo: 'bairro', tags: ['mac'] },
  { nome: 'Mutamba', municipio: 'Luanda', tipo: 'bairro', tags: ['mut'] },
  { nome: 'Coqueiros', municipio: 'Luanda', tipo: 'bairro', tags: ['coq'] },
  { nome: 'Prenda', municipio: 'Luanda', tipo: 'bairro', tags: ['pre'] },
  { nome: 'Marçal', municipio: 'Luanda', tipo: 'bairro', tags: ['mar'] },
  { nome: 'Cazenga', municipio: 'Luanda', tipo: 'bairro', tags: ['caz'] },
  { nome: 'Cacuaco', municipio: 'Luanda', tipo: 'bairro', tags: ['cac'] },
  { nome: 'Rangel', municipio: 'Luanda', tipo: 'bairro', tags: ['ran'] },
  { nome: 'Samba', municipio: 'Luanda', tipo: 'bairro', tags: ['sam'] },
  { nome: 'Neves Bendinha', municipio: 'Luanda', tipo: 'bairro', tags: ['nev'] },
  { nome: 'Futungo de Belas', municipio: 'Luanda', tipo: 'bairro', tags: ['fut'] },
  { nome: 'Guipiri', municipio: 'Luanda', tipo: 'bairro', tags: ['gui'] },
  { nome: 'Cabo Seco', municipio: 'Luanda', tipo: 'bairro', tags: ['cab'] },
  { nome: 'Miramar', municipio: 'Luanda', tipo: 'bairro', tags: ['mir'] },
  { nome: 'São Paulo', municipio: 'Luanda', tipo: 'bairro', tags: ['sao'] },
  { nome: 'Aeroporto', municipio: 'Luanda', tipo: 'bairro', tags: ['aer'] },
  { nome: 'Morro Bento', municipio: 'Luanda', tipo: 'bairro', tags: ['mor'] },
  { nome: 'Vila Alice', municipio: 'Luanda', tipo: 'bairro', tags: ['vil'] },
  { nome: 'Bairro Operário', municipio: 'Luanda', tipo: 'bairro', tags: ['ope'] },
  { nome: 'Casa Branca', municipio: 'Luanda', tipo: 'bairro', tags: ['cas'] },
  { nome: 'Kapalanca', municipio: 'Luanda', tipo: 'bairro', tags: ['kap'] },
  { nome: 'Palanca', municipio: 'Luanda', tipo: 'bairro', tags: ['pal'] },
  { nome: 'Hoje Ya Henda', municipio: 'Luanda', tipo: 'bairro', tags: ['hoj'] },
  { nome: 'Sambizanga', municipio: 'Luanda', tipo: 'bairro', tags: ['sam'] },
  { nome: 'Bela Vista', municipio: 'Luanda', tipo: 'bairro', tags: ['bel'] },
  { nome: 'Corimba', municipio: 'Luanda', tipo: 'bairro', tags: ['cor'] },
  { nome: 'Chicala', municipio: 'Luanda', tipo: 'bairro', tags: ['chi'] },
  { nome: 'Terra Nova', municipio: 'Luanda', tipo: 'bairro', tags: ['ter'] },
  { nome: 'Ilha do Cabo', municipio: 'Luanda', tipo: 'bairro', tags: ['ilh'] },
  { nome: 'Marginal', municipio: 'Luanda', tipo: 'bairro', tags: ['mar'] },

  // Benguela
  { nome: 'Benguela Centro', municipio: 'Benguela', tipo: 'bairro', tags: ['ben'] },
  { nome: 'Lobito', municipio: 'Benguela', tipo: 'bairro', tags: ['lob'] },
  { nome: 'Baía Farta', municipio: 'Benguela', tipo: 'bairro', tags: ['bai'] },
  { nome: 'Catumbela', municipio: 'Benguela', tipo: 'bairro', tags: ['cat'] },
  { nome: 'Dombe Grande', municipio: 'Benguela', tipo: 'bairro', tags: ['dom'] },

  // Huíla
  { nome: 'Lubango', municipio: 'Huíla', tipo: 'bairro', tags: ['lub'] },
  { nome: 'Matala', municipio: 'Huíla', tipo: 'bairro', tags: ['mat'] },
  { nome: 'Quilengues', municipio: 'Huíla', tipo: 'bairro', tags: ['qui'] },
  { nome: 'Humpata', municipio: 'Huíla', tipo: 'bairro', tags: ['hum'] },
  { nome: 'Chibia', municipio: 'Huíla', tipo: 'bairro', tags: ['chi'] },

  // Outros municípios populares
  { nome: 'Sumbe', municipio: 'Kwanza Sul', tipo: 'bairro', tags: ['sum'] },
  { nome: 'Malanje', municipio: 'Malanje', tipo: 'bairro', tags: ['mal'] },
  { nome: 'Saurimo', municipio: 'Lunda Sul', tipo: 'bairro', tags: ['sau'] },
  { nome: 'Huambo', municipio: 'Huambo', tipo: 'bairro', tags: ['hua'] },
  { nome: 'Caála', municipio: 'Huambo', tipo: 'bairro', tags: ['caa'] },
  { nome: 'Cuíto', municipio: 'Bié', tipo: 'bairro', tags: ['cui'] },
  { nome: 'Menongue', municipio: 'Cuando Cubango', tipo: 'bairro', tags: ['men'] },
  { nome: 'Ondjiva', municipio: 'Cunene', tipo: 'bairro', tags: ['ond'] },
  { nome: 'Moçâmedes', municipio: 'Namibe', tipo: 'bairro', tags: ['moc'] },
  { nome: 'Tômbua', municipio: 'Namibe', tipo: 'bairro', tags: ['tom'] },
  { nome: 'Cabinda', municipio: 'Cabinda', tipo: 'bairro', tags: ['cab'] },
  { nome: 'Caxito', municipio: 'Bengo', tipo: 'bairro', tags: ['cax'] },
  { nome: 'N\'Dalatando', municipio: 'Kwanza Norte', tipo: 'bairro', tags: ['nda'] },
  { nome: 'Dundo', municipio: 'Lunda Norte', tipo: 'bairro', tags: ['dun'] },
  { nome: 'Lucapa', municipio: 'Lunda Norte', tipo: 'bairro', tags: ['luc'] },
  { nome: 'Soyo', municipio: 'Zaire', tipo: 'bairro', tags: ['soy'] },
  { nome: 'Mbanza Congo', municipio: 'Zaire', tipo: 'bairro', tags: ['mba'] },

  // Pontos de referência
  { nome: 'Hospital Militar', municipio: 'Luanda', tipo: 'zona', tags: ['hospital', 'saude'] },
  { nome: 'Hospital Josina Machel', municipio: 'Luanda', tipo: 'zona', tags: ['hospital', 'saude'] },
  { nome: 'Hospital Amerique', municipio: 'Luanda', tipo: 'zona', tags: ['hospital', 'saude'] },
  { nome: 'Clínica Multiperfil', municipio: 'Luanda', tipo: 'zona', tags: ['hospital', 'saude'] },
  { nome: 'ISPT', municipio: 'Luanda', tipo: 'zona', tags: ['escola', 'universidade'] },
  { nome: 'Universidade Agostinho Neto', municipio: 'Luanda', tipo: 'zona', tags: ['escola', 'universidade'] },
  { nome: 'Mercado do Roque Santeiro', municipio: 'Luanda', tipo: 'zona', tags: ['mercado', 'compras'] },
  { nome: 'Mercado de São Paulo', municipio: 'Luanda', tipo: 'zona', tags: ['mercado', 'compras'] },
  { nome: 'Mercado dos Congolenses', municipio: 'Luanda', tipo: 'zona', tags: ['mercado', 'compras'] },
  { nome: 'Shopping Belas', municipio: 'Luanda', tipo: 'zona', tags: ['shopping', 'compras'] },
  { nome: 'Atlântico Shopping', municipio: 'Luanda', tipo: 'zona', tags: ['shopping', 'compras'] },
  { nome: 'Fortaleza de São Miguel', municipio: 'Luanda', tipo: 'zona', tags: ['ponto de referencia'] },
  { nome: 'Marginal de Luanda', municipio: 'Luanda', tipo: 'zona', tags: ['ponto de referencia'] },
  { nome: 'Ilha de Luanda', municipio: 'Luanda', tipo: 'zona', tags: ['ponto de referencia', 'praia'] },
  { nome: 'Parque da Cidade', municipio: 'Luanda', tipo: 'zona', tags: ['parque', 'ponto de referencia'] },
]

export function searchBairros(query: string): Bairro[] {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return bairrosAngolanos
    .filter(b => {
      const nome = b.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const municipio = b.municipio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const tags = (b.tags || []).some(t => t.includes(q))
      return nome.includes(q) || municipio.includes(q) || tags
    })
    .slice(0, 8)
}

export const municipios = [...new Set(bairrosAngolanos.map(b => b.municipio))].sort()
