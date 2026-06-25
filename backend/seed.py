from sqlalchemy.orm import Session
from backend.models import Property, Broker


def seed_data(db: Session):
    if db.query(Property).count() > 0:
        return

    props = [
        Property(
            id=1, title="Vivenda de Luxo com Piscina", location="Talatona", municipio="Belas",
            type="Villa", beds=5, baths=4, area=450, price=550000,
            mode="brokered", featured=True, is_new=False, has_video=True, negotiable=False,
            desc="Vivenda de prestígio com piscina privada, jardim tropical e garagem para 3 carros. Acabamentos de alta qualidade em condomínio fechado com segurança 24h.",
            amenities={"piscina": True, "garagem": True, "condominio": True, "mobilado": True, "jardim": True, "ar_cond": True, "gerador": True, "cisterna": True},
            color="#c8a97e", images=["#c8a97e", "#b8956a", "#d4b888"],
            image_url="https://images.unsplash.com/photo-glhVDncQmhE?w=600&h=400&fit=crop",
        ),
        Property(
            id=2, title="Apartamento T3 Vista Mar", location="Miramar", municipio="Ingombota",
            type="T3", beds=3, baths=2, area=180, price=280000,
            mode="direct", featured=True, is_new=True, has_video=True, negotiable=False,
            desc="Espaçoso apartamento com vista panorâmica para a Baía de Luanda. Piso alto, cozinha equipada e varanda generosa.",
            amenities={"piscina": False, "garagem": True, "condominio": True, "mobilado": False, "jardim": False, "ar_cond": True, "gerador": True, "cisterna": True},
            color="#7eb5c8", images=["#7eb5c8", "#6aa5b8", "#8ec5d8"],
            image_url="https://images.unsplash.com/photo-P84xh3q3ccE?w=600&h=400&fit=crop",
        ),
        Property(
            id=3, title="Moderno T2 em Alvalade", location="Alvalade", municipio="Alvalade",
            type="T2", beds=2, baths=1, area=110, price=120000,
            mode="direct", featured=False, is_new=True, has_video=False, negotiable=True,
            desc="Apartamento recentemente renovado em bairro tranquilo e central. Próximo de escolas e supermercados.",
            amenities={"piscina": False, "garagem": False, "condominio": False, "mobilado": True, "jardim": False, "ar_cond": True, "gerador": False, "cisterna": False},
            color="#8dc87e", images=["#8dc87e", "#7db86e", "#9dd88e"],
            image_url="https://images.unsplash.com/photo-E8fqapcvz2Y?w=600&h=400&fit=crop",
        ),
        Property(
            id=4, title="Penthouse de Luxo no Kinaxixi", location="Kinaxixi", municipio="Maianga",
            type="T4+", beds=4, baths=3, area=320, price=420000,
            mode="brokered", featured=True, is_new=False, has_video=True, negotiable=False,
            desc="Penthouse exclusivo com terraço privativo. Duas suites, sala dupla e cozinha gourmet. Vista 360° sobre Luanda.",
            amenities={"piscina": False, "garagem": True, "condominio": True, "mobilado": True, "jardim": False, "ar_cond": True, "gerador": True, "cisterna": True},
            color="#b87ec8", images=["#b87ec8", "#a86eb8", "#c88ed8"],
            image_url="https://images.unsplash.com/photo-joHwkYED8OI?w=600&h=400&fit=crop",
        ),
        Property(
            id=5, title="Escritório Executivo no Intercontinental", location="Mutamba", municipio="Ingombota",
            type="Escritório", beds=0, baths=2, area=220, price=380000,
            mode="brokered", featured=False, is_new=False, has_video=False, negotiable=True,
            desc="Espaço de escritório premium em edifício de classe A, com recepção, sala de reuniões e estacionamento.",
            amenities={"piscina": False, "garagem": True, "condominio": True, "mobilado": True, "jardim": False, "ar_cond": True, "gerador": True, "cisterna": False},
            color="#c8c87e", images=["#c8c87e", "#b8b86e", "#d8d88e"],
            image_url="https://images.unsplash.com/photo-TVyhDpvL8MY?w=600&h=400&fit=crop",
        ),
        Property(
            id=6, title="Casa Familiar em Viana", location="Viana Sede", municipio="Viana",
            type="T3", beds=3, baths=2, area=200, price=95000,
            mode="direct", featured=False, is_new=False, has_video=False, negotiable=True,
            desc="Casa espaçosa com quintal, própria para família. Bairro residencial seguro, próximo de mercado e transportes.",
            amenities={"piscina": False, "garagem": True, "condominio": False, "mobilado": False, "jardim": True, "ar_cond": False, "gerador": False, "cisterna": True},
            color="#7ec8a8", images=["#7ec8a8", "#6eb898", "#8ed8b8"],
            image_url="https://images.unsplash.com/photo-UioWfxiThm0?w=600&h=400&fit=crop",
        ),
        Property(
            id=7, title="Studio Moderno no Rangel", location="Rangel", municipio="Rangel",
            type="T1", beds=1, baths=1, area=55, price=65000,
            mode="direct", featured=False, is_new=True, has_video=False, negotiable=False,
            desc="Studio compacto e bem aproveitado, ideal para solteiros ou casais sem filhos. Totalmente mobilado.",
            amenities={"piscina": False, "garagem": False, "condominio": False, "mobilado": True, "jardim": False, "ar_cond": True, "gerador": False, "cisterna": False},
            color="#c87e7e", images=["#c87e7e", "#b86e6e", "#d88e8e"],
            image_url="https://images.unsplash.com/photo-13-ai1bxEhE?w=600&h=400&fit=crop",
        ),
        Property(
            id=8, title="Vivenda Condomínio Golf Talatona", location="Talatona Golf", municipio="Belas",
            type="Villa", beds=6, baths=5, area=600, price=950000,
            mode="brokered", featured=True, is_new=False, has_video=True, negotiable=False,
            desc="Excelência absoluta. Vivenda de 6 quartos no condomínio mais exclusivo de Luanda. Campo de golfe privado, spa e clube.",
            amenities={"piscina": True, "garagem": True, "condominio": True, "mobilado": True, "jardim": True, "ar_cond": True, "gerador": True, "cisterna": True},
            color="#7e8ec8", images=["#7e8ec8", "#6e7eb8", "#8e9ed8"],
            image_url="https://images.unsplash.com/photo-d3aYuitWBoc?w=600&h=400&fit=crop",
        ),
    ]

    for p in props:
        db.add(p)

    brokers = [
        Broker(id=1, name="Ana Cristina Santos", area="Talatona, Belas, Kilamba", rating=4.9, reviews=127, deals=89, experience=8, avatar="AC", certified=True, speciality="Imóveis de Luxo"),
        Broker(id=2, name="Miguel António Ferreira", area="Miramar, Ingombota, Maianga", rating=4.7, reviews=94, deals=62, experience=5, avatar="MA", certified=True, speciality="Apartamentos"),
        Broker(id=3, name="Esperança Ndunge", area="Alvalade, Samba, Cazenga", rating=4.8, reviews=73, deals=48, experience=6, avatar="EN", certified=True, speciality="Imóveis Residenciais"),
        Broker(id=4, name="Pedro Lúcio Baptista", area="Viana, Cacuaco, Kilamba Kiaxi", rating=4.6, reviews=51, deals=35, experience=4, avatar="PL", certified=False, speciality="Casas Familiares"),
        Broker(id=5, name="Carla Domingos Silva", area="Mutamba, Ingombota", rating=4.9, reviews=112, deals=78, experience=9, avatar="CD", certified=True, speciality="Escritórios e Comercial"),
        Broker(id=6, name="João Sebastião Costa", area="Rangel, Sambizanga", rating=4.5, reviews=38, deals=24, experience=3, avatar="JC", certified=False, speciality="Imóveis Económicos"),
    ]

    for b in brokers:
        db.add(b)

    db.commit()
