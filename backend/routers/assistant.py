from google import genai
from google.genai import types
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
import re
from backend.config import GEMINI_API_KEY
from backend.models import Property, Broker
from backend.database import get_db

router = APIRouter(prefix="/assistant", tags=["assistant"])

LISBOA = {
    "bairros_com_info": {
        "Alvalade": {
            "tipo": "residencial central",
            "perfil": "Familias e jovens profissionais",
            "preco_medio": "120.000 - 250.000 Kz",
            "proximos": ["Roma", "Sao Joao", "Campo Pequeno"],
            "destaque": "Tranquilo, arborizado, bons servicos e transportes",
        },
        "Maianga": {
            "tipo": "central / comercio",
            "perfil": "Profissionais, comerciantes",
            "preco_medio": "150.000 - 350.000 Kz",
            "proximos": ["Kinaxixi", "Mutamba", "Ingombota"],
            "destaque": "Zona nobre, bons edificios, proxima do centro",
        },
        "Ingombota": {
            "tipo": "central nobre",
            "perfil": "Executivos, diplomatas",
            "preco_medio": "200.000 - 500.000 Kz",
            "proximos": ["Miramar", "Mutamba", "Maianga"],
            "destaque": "Miramar, Marginal, vista baia, melhor zona de Luanda",
        },
        "Talatona": {
            "tipo": "moderno nobre",
            "perfil": "Executivos, empresarios, expatriados",
            "preco_medio": "300.000 - 1.000.000 Kz",
            "proximos": ["Benfica", "Viana", "Camama"],
            "destaque": "Condominios de luxo, golf, seguranca, melhores infraestruturas",
        },
        "Kilamba": {
            "tipo": "residencial moderno",
            "perfil": "Familias, classe media-alta",
            "preco_medio": "80.000 - 200.000 Kz",
            "proximos": ["Talatona", "Viana", "Benfica"],
            "destaque": "Cidade moderna, boas vias, apartamentos novos",
        },
        "Viana": {
            "tipo": "residencial economico",
            "perfil": "Familias, trabalhadores",
            "preco_medio": "50.000 - 120.000 Kz",
            "proximos": ["Kilamba", "Talatona", "Cacuaco"],
            "destaque": "Mais espaco por menos preco, quintais, zona em crescimento",
        },
        "Benfica": {
            "tipo": "residencial medio",
            "perfil": "Familias, jovens casais",
            "preco_medio": "70.000 - 180.000 Kz",
            "proximos": ["Talatona", "Kilamba", "Camama"],
            "destaque": "Crescente, bons acessos ao centro e sul",
        },
        "Miramar": {
            "tipo": "luxo central",
            "perfil": "Alta sociedade, empresarios",
            "preco_medio": "250.000 - 600.000 Kz",
            "proximos": ["Ingombota", "Mutamba", "Maianga"],
            "destaque": "Vista mar, embaixadas, sossego, elite luandense",
        },
        "Mutamba": {
            "tipo": "centro comercio",
            "perfil": "Empresas, comerciantes",
            "preco_medio": "180.000 - 400.000 Kz",
            "proximos": ["Ingombota", "Maianga", "Kinaxixi"],
            "destaque": "Coracao de Luanda, predios comerciais, bancos",
        },
        "Kinaxixi": {
            "tipo": "central residencial",
            "perfil": "Profissionais, familias",
            "preco_medio": "150.000 - 350.000 Kz",
            "proximos": ["Maianga", "Mutamba", "Ingombota"],
            "destaque": "Zona emblematica, bons predios, proximo de tudo",
        },
        "Rangel": {
            "tipo": "residencial medio",
            "perfil": "Familias, estudantes",
            "preco_medio": "50.000 - 100.000 Kz",
            "proximos": ["Maianga", "Alvalade", "Samba"],
            "destaque": "Zona movimentada, bons precos, transporte facil",
        },
        "Samba": {
            "tipo": "residencial popular",
            "perfil": "Familias, trabalhadores",
            "preco_medio": "40.000 - 90.000 Kz",
            "proximos": ["Rangel", "Maianga", "Cazenga"],
            "destaque": "Zona tranquila, precos acessiveis, comunidades",
        },
        "Cazenga": {
            "tipo": "popular movimentado",
            "perfil": "Familias, comercio informal",
            "preco_medio": "30.000 - 70.000 Kz",
            "proximos": ["Rangel", "Samba", "Viana"],
            "destaque": "Muito movimento, comercio, precos baixos",
        },
        "Rocha Pinto": {
            "tipo": "residencial medio",
            "perfil": "Familias, classe media",
            "preco_medio": "60.000 - 130.000 Kz",
            "proximos": ["Alvalade", "Maianga", "Rangel"],
            "destaque": "Zona calma, bons acessos, familiar",
        },
        "Morro Bento": {
            "tipo": "residencial nobre",
            "perfil": "Classe media-alta",
            "preco_medio": "100.000 - 250.000 Kz",
            "proximos": ["Talatona", "Benfica", "Camama"],
            "destaque": "Zona alta, vista panoramica, sossego",
        },
        "Camama": {
            "tipo": "residencial medio",
            "perfil": "Familias, universitarios",
            "preco_medio": "60.000 - 140.000 Kz",
            "proximos": ["Talatona", "Benfica", "Kilamba"],
            "destaque": "Proximo a universidades, crescente, bons precos",
        },
        "Ilha (Luanda Island)": {
            "tipo": "luxo lazer",
            "perfil": "Restauracao, lazer, moradores de luxo",
            "preco_medio": "250.000 - 800.000 Kz",
            "proximos": ["Ingombota", "Marginal", "Mutamba"],
            "destaque": "Frente mar, restaurantes, vida noturna, exclusivo",
        },
        "Marginal": {
            "tipo": "orla nobre",
            "perfil": "Executivos, lazer",
            "preco_medio": "200.000 - 600.000 Kz",
            "proximos": ["Ingombota", "Ilha", "Mutamba"],
            "destaque": "Beira-mar, bares, corrida, vista baia",
        },
    },
    "dicas_arrendamento": [
        "Em Luanda, o valor do condominio pode ou nao estar incluido no preco do arrendamento - confirma sempre.",
        "A caução tipica e de 6 meses de renda em Luanda, mas pode ser negociada.",
        "Zonas como Talatona e Miramar tem melhor fornecimento de agua e energia.",
        "Verifica se o imovel tem gerador e cisterna, essenciais em Luanda.",
        "Bairros como Viana e Kilamba oferecem melhor relacao custo-beneficio.",
        "O transito em Luanda e intenso - considera a distancia ao trabalho.",
        "A Marginal e optima para quem gosta de correr ou passear ao fim do dia.",
    ],
}


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


class ChatResponse(BaseModel):
    reply: str


def build_system_prompt(db: Session) -> str:
    total_props = db.query(Property).count()
    tipos = [r[0] for r in db.query(Property.type).distinct().all()]
    municipios = [r[0] for r in db.query(Property.municipio).distinct().all()]
    min_price, max_price = db.query(
        func.min(Property.price), func.max(Property.price)
    ).first()
    total_brokers = db.query(Broker).count()
    broker_areas = [r[0] for r in db.query(Broker.area).distinct().all()]

    sample = (
        db.query(Property)
        .order_by(Property.created_at.desc())
        .limit(5)
        .all()
    )
    sample_lines = []
    for p in sample:
        amens = ", ".join(str(k) for k, v in (p.amenities or {}).items() if v)
        sample_lines.append(
            f"ID:{p.id} - {p.title} | {p.location}, {p.municipio} | {p.beds} qrt, {p.baths} wc, {p.area}m2 | "
            f"{p.price:,.0f} Kz/mes | {'Directo' if p.mode == 'direct' else 'Com Intermediario'} | "
            f"{'Destaque' if p.featured else ''} {'Novo' if p.is_new else ''} | Amenities: {amens}"
        )

    return f"""ETs o consultor imobiliario digital da ArrendaKi, a plataforma angolana de arrendamento.

A tua personalidade:
- Profissional, simpatico e paciente
- Conheces Angola profundamente, especialmente Luanda e seus bairros
- Tens experiencia em aconselhamento imobiliario
- Nao es um robô de busca - es um consultor que guia o cliente

REGRA DE OURO:
NUNCA digas apenas "Nao encontramos imoveis" ou "Nenhum resultado". Se nao houver match exato, SUGERE alternativas: bairros proximos, tipologias semelhantes, ou faz perguntas para refinar. Usa o teu conhecimento de Angola para ajudar.

INFORMACAO DO SISTEMA (dados reais):
- Total de imoveis disponiveis: {total_props}
- Tipos de imovel: {', '.join(tipos)}
- Municipios com imoveis: {', '.join(municipios)}
- Faixa de precos: {min_price:,.0f} Kz a {max_price:,.0f} Kz/mes
- Total de intermediarios: {total_brokers}
- Areas dos intermediarios: {', '.join(broker_areas)}

EXEMPLOS DE IMOVEIS RECENTES NO SISTEMA:
{chr(10).join(sample_lines)}

CONHECIMENTO SOBRE BAIRROS DE LUANDA:
{chr(10).join(f'- {k}: {v["tipo"]} | {v["perfil"]} | Precos: {v["preco_medio"]} | Bairros proximos: {", ".join(v["proximos"])} | {v["destaque"]}' for k, v in LISBOA["bairros_com_info"].items())}

DICAS DE ARRENDAMENTO EM ANGOLA:
{chr(10).join(f'- {d}' for d in LISBOA['dicas_arrendamento'])}

DIRETRIZES:
1. Responde SEMPRE em portugues de Angola (pt-AO), com calão angolano quando apropriado (ex: "bairro", "garoa", "bué", "xii...")
2. Ages como consultor: faz perguntas, sugere opcoes, recomenda bairros, explica o mercado
3. QUANDO NAO HOUVER RESULTADOS: Sugere bairros proximos, imoveis com tipologia similar, ou faz perguntas ao utilizador para entender melhor o que procura. Usa o teu conhecimento dos bairros de Luanda.
4. Se o utilizador pedir imoveis, usa os dados fornecidos na seccao "IMOVEIS RELEVANTES" ou "INFORMACAO DO SISTEMA"
5. Se pedirem um bairro especifico e nao houver imoveis la, sugere bairros proximos da mesma zona
6. SE O PRECO NAO FOR SUFICIENTE: pergunta se pode estender o orcamento ou sugerir bairros mais acessiveis
7. Recomenda imoveis com base nas necessidades (ex: com gerador/cisterna para Luanda, quintal para familias)
8. Nao inventes precos - usa apenas os dados do sistema
9. Se alguem pedir "T2", e nao houver, mostra T1 amplo ou T3 mais barato
10. Mantem um tom de consultor amigavel: "Posso ajudar-te a encontrar", "Que achas de...", "Recomendo..."
11. Se pedirem informacao sobre documentos, burocracia, ou mercado, partilha o teu conhecimento de Angola"""


def parse_price_range(text: str) -> tuple[float | None, float | None]:
    text = text.lower().replace(".", "").replace(",", "")
    numbers = [int(n) for n in re.findall(r"\d+", text) if int(n) > 0]

    min_p = None
    max_p = None

    patterns = [
        (r"ate\s*(\d+)", "max"),
        (r"(\d+)\s*a\s*(\d+)", "range"),
        (r"entre\s*(\d+)\s*e\s*(\d+)", "range"),
        (r"de\s*(\d+)\s*(?:ate|a)\s*(\d+)", "range"),
        (r"max(?:imo)?\s*(\d+)", "max"),
        (r"min(?:imo)?\s*(\d+)", "min"),
        (r"menos\s*de\s*(\d+)", "max"),
        (r"mais\s*de\s*(\d+)", "min"),
        (r"superior\s*a\s*(\d+)", "min"),
        (r"(\d+)\s*Kz", "maybe"),
        (r"(\d+)\s*(?:mil|k)\s*Kz", "maybe"),
    ]

    for pattern, ptype in patterns:
        m = re.search(pattern, text)
        if m:
            if ptype == "range":
                return float(m.group(1)), float(m.group(2))
            elif ptype == "min":
                return float(m.group(1)), None
            elif ptype == "max":
                return None, float(m.group(1))
            elif ptype == "maybe" and max_p is None:
                val = float(m.group(1))
                if "mil" in text or "k" in text:
                    val *= 1000
                if len(numbers) == 1:
                    if val < 50000:
                        min_p = val
                    else:
                        max_p = val
                elif len(numbers) >= 2:
                    ns = sorted(numbers)
                    min_p, max_p = float(ns[0]), float(ns[-1])

    if not min_p and not max_p and numbers:
        if len(numbers) == 1:
            val = float(numbers[0])
            if val > 1000000:
                min_p = val * 0.5
                max_p = val
            else:
                max_p = val
        else:
            ns = sorted(numbers)
            min_p, max_p = float(ns[0]), float(ns[-1])

    return min_p, max_p


def parse_rooms(text: str) -> int | None:
    room_map = {"t1": 1, "t2": 2, "t3": 3, "t4": 4, "t5": 5, "t0": 0}
    for k, v in room_map.items():
        if k in text.lower():
            return v
    m = re.search(r"(\d+)\s*(?:quartos|qrt)", text.lower())
    if m:
        return int(m.group(1))
    if "quarto" in text.lower() or "studio" in text.lower():
        return 1
    return None


def search_properties(db: Session, query: str) -> dict:
    q = query.lower()
    filters = []
    tipos_map = {
        "apartamento": "Apartamento", "casa": "Casa", "vivenda": "Vivenda",
        "quarto": "Quarto", "villa": "Villa", "escritorio": "Escritorio",
        "t0": "T0", "t1": "T1", "t2": "T2", "t3": "T3", "t4": "T4", "t4+": "T4+",
    }
    for pt, eng in tipos_map.items():
        if pt in q:
            filters.append(Property.type.ilike(f"%{eng}%"))

    bairros_conhecidos = [
        "talatona", "kilamba", "alvalade", "maianga", "miramar", "viana",
        "benfica", "ingombota", "cazenga", "samba", "luanda", "belas",
        "rangel", "mutamba", "kinaxixi", "rocha pinto", "morro bento",
        "camama", "marginal", "ilha", "cacuaco",
    ]
    for bairro in bairros_conhecidos:
        if bairro in q:
            filters.append(Property.municipio.ilike(f"%{bairro}%"))
            break

    if "directo" in q:
        filters.append(Property.mode == "direct")
    if "intermediario" in q or "mediador" in q:
        filters.append(Property.mode == "brokered")
    if "destaque" in q or "top" in q:
        filters.append(Property.featured == True)
    if "novo" in q:
        filters.append(Property.is_new == True)
    if "negociavel" in q or "negociável" in q:
        filters.append(Property.negotiable == True)

    min_price, max_price = parse_price_range(q)
    query_obj = db.query(Property)
    for f in filters:
        query_obj = query_obj.filter(f)
    if min_price:
        query_obj = query_obj.filter(Property.price >= min_price)
    if max_price:
        query_obj = query_obj.filter(Property.price <= max_price)

    all_matched = query_obj.order_by(
        Property.featured.desc(), Property.created_at.desc()
    ).limit(20).all()

    amenity_keys = ["piscina", "garagem", "mobilado", "jardim", "ar_cond", "condominio", "gerador", "cisterna"]
    active_amenities = [k for k in amenity_keys if k in q or k.replace("_", " ") in q]
    if active_amenities:
        filtered = []
        for p in all_matched:
            amens = p.amenities or {}
            if all(amens.get(k) for k in active_amenities):
                filtered.append(p)
        all_matched = filtered

    num_rooms = parse_rooms(q)
    if num_rooms is not None:
        exact = [p for p in all_matched if p.beds == num_rooms]
        if exact:
            all_matched = exact
        else:
            nearby = [p for p in all_matched if abs(p.beds - num_rooms) <= 1]
            if nearby:
                all_matched = nearby

    result_lines = []
    for p in all_matched[:10]:
        amens_list = [str(k) for k, v in (p.amenities or {}).items() if v]
        result_lines.append(
            f"ID:{p.id} | {p.title} | {p.location}, {p.municipio} | {p.type} | "
            f"{p.beds} qrt, {p.baths} wc, {p.area}m2 | {p.price:,.0f} Kz/mes | "
            f"{'Directo' if p.mode == 'direct' else 'Com Intermediario'} | "
            f"Amenities: {', '.join(amens_list) if amens_list else 'nenhuma'}"
        )

    return {
        "found": result_lines,
        "total_matched": len(all_matched),
        "total_in_db": db.query(Property).count(),
        "min_price_db": db.query(func.min(Property.price)).scalar() or 0,
        "max_price_db": db.query(func.max(Property.price)).scalar() or 0,
    }


@router.post("/chat", response_model=ChatResponse)
def assistant_chat(req: ChatRequest, db: Session = Depends(get_db)):
    if not GEMINI_API_KEY:
        return ChatResponse(reply="O assistente ainda nao foi configurado. Contacta a equipa ArrendaKi.")

    client = genai.Client(api_key=GEMINI_API_KEY)
    system_prompt = build_system_prompt(db)

    search_terms = [
        "imovel", "imoveis", "quarto", "apartamento", "casa", "vivenda",
        "t1", "t2", "t3", "t4", "preco", "preço", "comprar", "alugar",
        "arrendar", "procuro", "preciso", "bairro", "municipio", "zona",
        "piscina", "garagem", "mobilado", "condominio", "destaque", "novo",
        "directo", "intermediario", "studio", "escritorio", "quintal",
        "jardim", "gerador", "cisterna", "ar cond", "vaga", "visto",
    ]

    context_extra = ""
    search_data = None

    if any(w in req.message.lower() for w in search_terms):
        search_data = search_properties(db, req.message)
        if search_data["found"]:
            context_extra = "\n\nIMOVEIS RELEVANTES ENCONTRADOS NO SISTEMA:\n" + "\n".join(search_data["found"])
            context_extra += f"\n\nTotal de matches: {search_data['total_matched']}"
        else:
            context_extra = (
                f"\n\nPESQUISA SEM RESULTADOS EXATOS. DADOS PARA CONSULTA:\n"
                f"- Total imoveis na base: {search_data['total_in_db']}\n"
                f"- Faixa de precos disponivel: {search_data['min_price_db']:,.0f} Kz a {search_data['max_price_db']:,.0f} Kz\n"
                f"- O utilizador precisa de ajuda para encontrar opcoes adequadas.\n"
                f"- IMPORTANTE: Sugere bairros proximos, imoveis de tipologia similar, ou pergunta mais detalhes."
            )

    if any(w in req.message.lower() for w in ["intermediario", "mediador", "corretor", "agente", "broker"]):
        brokers = db.query(Broker).all()
        if brokers:
            context_extra += "\n\nINTERMEDIARIOS DISPONIVEIS:\n"
            for b in brokers:
                context_extra += (
                    f"- {b.name} | Area: {b.area} | {b.rating}/5 estrelas | "
                    f"{b.deals} negocios fechados | {'Certificado' if b.certified else ''}\n"
                )

    config = types.GenerateContentConfig(
        system_instruction=system_prompt,
    )

    contents = []
    for h in req.history[-10:]:
        role = "user" if h.get("role") == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": h.get("content", "")}],
        })
    full_prompt = req.message + context_extra
    contents.append({
        "role": "user",
        "parts": [{"text": full_prompt}],
    })

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=contents,
            config=config,
        )
        return ChatResponse(reply=response.text)
    except Exception as e:
        return ChatResponse(
            reply=f"Desculpa, ocorreu um erro ao processar a tua mensagem. Tenta novamente."
        )


@router.get("/status")
def assistant_status():
    return {"configured": bool(GEMINI_API_KEY), "model": "gemini-3.1-flash-lite-preview"}
