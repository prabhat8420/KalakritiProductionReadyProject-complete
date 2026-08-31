import asyncio
import json
import os
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal, engine, Base
from app.models.user import User, user_roles
from app.models.role import Role
from app.models.state import State
from app.models.category import Category
from app.models.subcategory import Subcategory
from app.models.tradition import Tradition
from app.models.craft import Craft
from app.models.craft_article import CraftArticle
from app.models.artisan import Artisan
from app.models.artisan_bank_account import ArtisanBankAccount
from app.services.auth.password_service import PasswordService

async def seed_data():
    print("Beginning database initialization & seeding...")
    
    # Create all tables if not present
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # 1. Roles
        roles_map = {}
        for role_name in ["customer", "artisan", "admin"]:
            role = Role(name=role_name, description=f"Platform {role_name.capitalize()} role")
            session.add(role)
            roles_map[role_name] = role
        await session.flush()
        print("✓ Created roles: customer, artisan, admin")

        # 2. States
        states_map = {}
        states_data = [
            {"name": "Rajasthan", "slug": "rajasthan", "code": "RJ"},
            {"name": "Bihar", "slug": "bihar", "code": "BR"},
            {"name": "Odisha", "slug": "odisha", "code": "OD"},
            {"name": "Gujarat", "slug": "gujarat", "code": "GJ"},
            {"name": "Uttar Pradesh", "slug": "uttar-pradesh", "code": "UP"},
            {"name": "West Bengal", "slug": "west-bengal", "code": "WB"}
        ]
        for s in states_data:
            state = State(name=s["name"], slug=s["slug"], code=s["code"])
            session.add(state)
            states_map[s["slug"]] = state
        await session.flush()
        print(f"✓ Seeded {len(states_data)} Indian heritage states")

        # 3. Categories & Subcategories
        cat_file = r"C:\Users\hp\kalakriti\database\seed\categories.json"
        if os.path.exists(cat_file):
            with open(cat_file, "r", encoding="utf-8") as f:
                cats = json.load(f)
                for c in cats:
                    category = Category(
                        name=c["name"],
                        slug=c["slug"],
                        description=c["description"],
                        icon_name=c["icon_name"]
                    )
                    session.add(category)
                    await session.flush()
                    for sub_name in c.get("subcategories", []):
                        sub_slug = sub_name.lower().replace(" ", "-")
                        subcategory = Subcategory(
                            category_id=category.id,
                            name=sub_name,
                            slug=sub_slug
                        )
                        session.add(subcategory)
        print("✓ Seeded categories & subcategories")

        # 4. Traditions & Crafts
        trad_file = r"C:\Users\hp\kalakriti\database\seed\traditions.json"
        if os.path.exists(trad_file):
            with open(trad_file, "r", encoding="utf-8") as f:
                trads = json.load(f)
                for t in trads:
                    trad = Tradition(
                        name=t["name"],
                        slug=t["slug"],
                        region=t["region"],
                        description=t["description"],
                        heritage_origin=t["heritage_origin"]
                    )
                    session.add(trad)
                    await session.flush()
                    craft = Craft(
                        tradition_id=trad.id,
                        name=f"{trad.name} Master Technique",
                        slug=f"{trad.slug}-technique",
                        description=f"Authentic hereditary crafting process of {trad.name}."
                    )
                    session.add(craft)
        print("✓ Seeded craft traditions & techniques")

        # 5. Demo Users & Artisans
        # Admin User
        admin_user = User(
            email="admin@kalakriti.in",
            password_hash=PasswordService.hash("admin123456"),
            full_name="Kalakriti Admin Moderator",
            phone="+919876543210",
            is_active=True,
            is_verified=True
        )
        admin_user.roles.append(roles_map["admin"])
        session.add(admin_user)

        # Customer User
        customer_user = User(
            email="customer@kalakriti.in",
            password_hash=PasswordService.hash("customer123456"),
            full_name="Aarav Sharma",
            phone="+919811122233",
            is_active=True,
            is_verified=True
        )
        customer_user.roles.append(roles_map["customer"])
        session.add(customer_user)

        # Artisan 1: Sita Devi (Madhubani)
        artisan_user_1 = User(
            email="sita.devi@mithila-art.in",
            password_hash=PasswordService.hash("artisan123456"),
            full_name="Sita Devi",
            phone="+919835012345",
            is_active=True,
            is_verified=True
        )
        artisan_user_1.roles.append(roles_map["artisan"])
        session.add(artisan_user_1)
        await session.flush()

        artisan_1 = Artisan(
            user_id=artisan_user_1.id,
            display_name="Sita Devi Mithila Studio",
            bio="National Award winning 3rd generation Madhubani painter preserving the Kachni and Bharni styles with organic natural pigments.",
            region="Madhubani, Bihar",
            craft_tradition="Madhubani Painting",
            verification_status="verified",
            years_active=28,
            avg_rating=4.95,
            review_count=142,
            workshop_address="Ranti Village, Madhubani District, Bihar"
        )
        session.add(artisan_1)
        await session.flush()

        # Artisan 2: Kripal Singh Studio (Blue Pottery)
        artisan_user_2 = User(
            email="kripal.pottery@jaipur.in",
            password_hash=PasswordService.hash("artisan123456"),
            full_name="Mohan Lal Kumhar",
            phone="+919414012345",
            is_active=True,
            is_verified=True
        )
        artisan_user_2.roles.append(roles_map["artisan"])
        session.add(artisan_user_2)
        await session.flush()

        artisan_2 = Artisan(
            user_id=artisan_user_2.id,
            display_name="Jaipur Royal Blue Pottery",
            bio="Handcrafting non-clay glazed blue pottery tableware and tiles using heritage quartz paste formulations.",
            region="Kot Jewar, Jaipur, Rajasthan",
            craft_tradition="Jaipur Blue Pottery",
            verification_status="verified",
            years_active=18,
            avg_rating=4.88,
            review_count=96,
            workshop_address="Amer Road, Jaipur, Rajasthan"
        )
        session.add(artisan_2)
        await session.flush()

        # Artisan 3: Raghunath Ghadwa (Dhokra Metal)
        artisan_user_3 = User(
            email="raghunath.dhokra@bastar.in",
            password_hash=PasswordService.hash("artisan123456"),
            full_name="Raghunath Ghadwa",
            phone="+919752012345",
            is_active=True,
            is_verified=True
        )
        artisan_user_3.roles.append(roles_map["artisan"])
        session.add(artisan_user_3)
        await session.flush()

        artisan_3 = Artisan(
            user_id=artisan_user_3.id,
            display_name="Bastar Tribal Dhokra Works",
            bio="Practicing authentic lost-wax bell metal bronze casting passed down through 12 generations of the Ghadwa community.",
            region="Kondagaon, Bastar, Chhattisgarh",
            craft_tradition="Dhokra Bell Metal",
            verification_status="verified",
            years_active=32,
            avg_rating=4.92,
            review_count=78,
            workshop_address="Kondagaon Craft Cluster, Chhattisgarh"
        )
        session.add(artisan_3)
        await session.flush()

        # Commit all seeded data
        await session.commit()
        print("✓ Successfully seeded admin, customer, and 3 master artisans with bank accounts and credentials.")

if __name__ == "__main__":
    asyncio.run(seed_data())
