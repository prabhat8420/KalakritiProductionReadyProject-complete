import logging
import asyncio
from sqlalchemy import text
from app.core.database import engine, Base, AsyncSessionLocal

logger = logging.getLogger("kalakriti.init_db")

async def init_and_seed_db():
    # Run in background after small delay so healthcheck probe responds instantly
    await asyncio.sleep(2)
    logger.info("📦 [Database Init] Verifying database tables in background...")
    try:
        import app.models # Register all models
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✅ [Database Init] Database schema verified.")
    except Exception as e:
        logger.warning(f"⚠️ [Database Init] Schema note: {e}")

    try:
        async with AsyncSessionLocal() as session:
            r = await session.execute(text("SELECT count(*) FROM categories;"))
            count = r.scalar()
            if count > 0:
                logger.info(f"ℹ️ [Database Init] Database already contains {count} categories. Synchronizing authentic craft image URLs...")
                await session.execute(text("UPDATE product_images SET image_url = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80' WHERE product_id IN (SELECT id FROM products WHERE slug = 'tree-of-life-mithila-art');"))
                await session.execute(text("UPDATE product_images SET image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' WHERE product_id IN (SELECT id FROM products WHERE slug = 'imperial-persian-cobalt-urn');"))
                await session.commit()
                return

            logger.info("🌱 [Database Init] Seeding heritage craft catalog...")
            from app.models.role import Role
            from app.models.user import User
            from app.models.category import Category
            from app.models.subcategory import Subcategory
            from app.models.tradition import Tradition
            from app.models.craft import Craft
            from app.models.state import State
            from app.models.artisan import Artisan
            from app.models.artisan_bank_account import ArtisanBankAccount
            from app.models.product import Product
            from app.models.product_variant import ProductVariant
            from app.models.product_image import ProductImage
            from app.models.product_certification import ProductCertification
            from app.models.inventory import Inventory
            from app.models.repair_partner import RepairPartner
            from app.core.security import hash_password

            # Roles
            admin_role = Role(name="admin", description="Platform Administrator")
            artisan_role = Role(name="artisan", description="Heritage Master Artisan")
            customer_role = Role(name="customer", description="Craft Patron & Buyer")
            session.add_all([admin_role, artisan_role, customer_role])
            await session.flush()

            # Admin & Customer
            admin_user = User(
                email="admin@kalakriti.in",
                phone="+919876543210",
                password_hash=hash_password("Admin@Kalakriti2026"),
                full_name="Kalakriti Heritage Admin",
                is_active=True,
                is_verified=True,
                roles=[admin_role]
            )
            cust_user = User(
                email="patron.rajesh@example.com",
                phone="+919876500001",
                password_hash=hash_password("Patron@2026"),
                full_name="Rajesh Kumar",
                is_active=True,
                is_verified=True,
                roles=[customer_role]
            )
            session.add_all([admin_user, cust_user])
            await session.flush()

            # States
            states_data = [
                ("Bihar", "bihar", "BR"),
                ("Rajasthan", "rajasthan", "RJ"),
                ("Chhattisgarh", "chhattisgarh", "CG"),
                ("Odisha", "odisha", "OD"),
                ("Gujarat", "gujarat", "GJ"),
                ("Uttar Pradesh", "uttar-pradesh", "UP"),
                ("Karnataka", "karnataka", "KA"),
                ("Tamil Nadu", "tamil-nadu", "TN"),
                ("West Bengal", "west-bengal", "WB")
            ]
            state_objs = {}
            for sname, sslug, scode in states_data:
                st = State(name=sname, slug=sslug, code=scode)
                session.add(st)
                state_objs[scode] = st
            await session.flush()

            # Categories & Subcategories
            cat_paintings = Category(name="Folk Paintings & Murals", slug="paintings", description="Ancient indigenous Indian storytelling art traditions.")
            cat_pottery = Category(name="Heritage Ceramic & Pottery", slug="pottery", description="Hand-thrown terracotta and quartz glazed pottery.")
            cat_metal = Category(name="Lost-Wax Bell Metal & Bronzes", slug="metalware", description="Indus-lineage tribal bronze and bell metal casting.")
            session.add_all([cat_paintings, cat_pottery, cat_metal])
            await session.flush()

            subcat_madhubani = Subcategory(category_id=cat_paintings.id, name="Mithila Madhubani Paintings", slug="madhubani")
            subcat_bluepottery = Subcategory(category_id=cat_pottery.id, name="Jaipur Blue Pottery", slug="jaipur-blue-pottery")
            subcat_dhokra = Subcategory(category_id=cat_metal.id, name="Dhokra Lost-Wax Bell Metal", slug="dhokra-craft")
            session.add_all([subcat_madhubani, subcat_bluepottery, subcat_dhokra])
            await session.flush()

            # Traditions & Crafts
            trad_madhubani = Tradition(name="Madhubani Painting", slug="madhubani", region="Mithila, Bihar", state_id=state_objs["BR"].id, heritage_origin="8th Century BCE Mithila Kingdom", description="Geometric storytelling made with natural vegetable dyes.")
            trad_bluepottery = Tradition(name="Jaipur Blue Pottery", slug="jaipur-blue-pottery", region="Jaipur, Rajasthan", state_id=state_objs["RJ"].id, heritage_origin="19th Century Sawai Ram Singh II", description="Glazed quartz-paste pottery with cobalt blue floral motifs.")
            trad_dhokra = Tradition(name="Dhokra Lost-Wax Bronze", slug="dhokra", region="Bastar, Chhattisgarh", state_id=state_objs["CG"].id, heritage_origin="Indus Valley Civilization (4000+ years)", description="Primitive lost-wax casting of non-ferrous bell metals.")
            session.add_all([trad_madhubani, trad_bluepottery, trad_dhokra])
            await session.flush()

            craft_madhubani = Craft(tradition_id=trad_madhubani.id, name="Kachni & Bharni Wall Scroll", slug="kachni-bharni", description="Fine nib double-line ink drawing.")
            craft_pottery = Craft(tradition_id=trad_bluepottery.id, name="Hand-Painted Cobalt Floral Vase", slug="cobalt-vase", description="Turquoise glazed quartz pottery.")
            craft_dhokra = Craft(tradition_id=trad_dhokra.id, name="Tribal Sun Deity Bell Metal Idol", slug="sun-deity", description="Ancient wax-thread casting technique.")
            session.add_all([craft_madhubani, craft_pottery, craft_dhokra])
            await session.flush()

            # Artisans
            artisan1_user = User(
                email="master.ganesh@mithila.in",
                phone="+919811122233",
                password_hash=hash_password("Artisan@2026"),
                full_name="Ganesh Jha",
                is_active=True,
                is_verified=True,
                roles=[artisan_role]
            )
            artisan2_user = User(
                email="master.kripal@jaipurpottery.in",
                phone="+919822233344",
                password_hash=hash_password("Artisan@2026"),
                full_name="Ram Narayan Kumbhar",
                is_active=True,
                is_verified=True,
                roles=[artisan_role]
            )
            session.add_all([artisan1_user, artisan2_user])
            await session.flush()

            art1 = Artisan(user_id=artisan1_user.id, display_name="Mithila Heritage Guild (Ganesh Jha)", bio="Master artisan with 28 years of Madhubani lineage.", region="Madhubani, Bihar", craft_tradition="Madhubani Painting", verification_status="verified", years_active=28, avg_rating=4.9, review_count=42, state_id=state_objs["BR"].id)
            art2 = Artisan(user_id=artisan2_user.id, display_name="Jaipur Royal Blue Pottery Studio", bio="Preserving 5th-generation Turko-Persian quartz pottery.", region="Jaipur, Rajasthan", craft_tradition="Jaipur Blue Pottery", verification_status="verified", years_active=34, avg_rating=4.95, review_count=68, state_id=state_objs["RJ"].id)
            session.add_all([art1, art2])
            await session.flush()

            session.add_all([
                ArtisanBankAccount(artisan_id=art1.id, account_holder_name="Ganesh Jha", bank_name="State Bank of India", account_details="XXXX-XXXX-1234", ifsc_code="SBIN0001234", is_primary=True),
                ArtisanBankAccount(artisan_id=art2.id, account_holder_name="Ram Narayan Kumbhar", bank_name="Bank of Baroda", account_details="XXXX-XXXX-5678", ifsc_code="BARB0JAIPUR", is_primary=True)
            ])

            # Products & Provenance
            p1 = Product(
                artisan_id=art1.id,
                category_id=cat_paintings.id,
                subcategory_id=subcat_madhubani.id,
                tradition_id=trad_madhubani.id,
                title="Tree of Life Mithila Folk Art",
                slug="tree-of-life-mithila-art",
                description_en="Hand-painted on handmade treated paper using bamboo dip pens and organic mineral dyes.",
                base_price=2800.0,
                artisan_share=2380.0,
                platform_fee=280.0,
                delivery_fee=140.0,
                ai_confidence_score=0.98,
                status="published"
            )
            p2 = Product(
                artisan_id=art2.id,
                category_id=cat_pottery.id,
                subcategory_id=subcat_bluepottery.id,
                tradition_id=trad_bluepottery.id,
                title="Imperial Persian Cobalt Ceramic Urn",
                slug="imperial-persian-cobalt-urn",
                description_en="Hand-thrown quartz clay glazed with natural cobalt oxide and copper sulphate.",
                base_price=2500.0,
                artisan_share=2125.0,
                platform_fee=250.0,
                delivery_fee=125.0,
                ai_confidence_score=0.96,
                status="published"
            )
            session.add_all([p1, p2])
            await session.flush()

            v1 = ProductVariant(product_id=p1.id, sku="KLK-MAD-TOL-01", variant_name="Framed 24x18 Canvas", price_delta=0.0, stock_quantity=12)
            v2 = ProductVariant(product_id=p2.id, sku="KLK-JBP-URN-01", variant_name="14-inch Glazed Urn", price_delta=0.0, stock_quantity=8)
            session.add_all([v1, v2])
            await session.flush()

            session.add_all([
                Inventory(product_variant_id=v1.id, quantity_available=12, quantity_reserved=0),
                Inventory(product_variant_id=v2.id, quantity_available=8, quantity_reserved=0),
                ProductImage(product_id=p1.id, image_url="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80", is_primary=True, display_order=1),
                ProductImage(product_id=p2.id, image_url="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", is_primary=True, display_order=1)
            ])

            cert1 = ProductCertification(product_id=p1.id, certificate_id=f"KLK-CERT-BR-MAD-202608-{p1.id[:8].upper()}", certificate_hash="d8f24a1b0c9e7f53a2b4e8c1d5f7a9b0c2e4f6a8b1c3d5e7f9a1b3c5d7e9f1a3", qr_code_url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQAPgaAAAA", craft_tradition="Madhubani Painting", artisan_name="Ganesh Jha", origin_region="Mithila, Bihar", raw_materials="Handmade Paper, Natural Plant Dyes", heritage_registry_badge="GI Certified Traditional Craft")
            cert2 = ProductCertification(product_id=p2.id, certificate_id=f"KLK-CERT-RJ-POT-202608-{p2.id[:8].upper()}", certificate_hash="a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d", qr_code_url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQAPgaAAAA", craft_tradition="Jaipur Blue Pottery", artisan_name="Ram Narayan Kumbhar", origin_region="Jaipur, Rajasthan", raw_materials="Quartz Powder, Natural Cobalt Glaze", heritage_registry_badge="GI Certified Traditional Craft")
            session.add_all([cert1, cert2])

            session.add_all([
                RepairPartner(name="Jaipur Heritage Ceramic & Quartz Restoration Guild", region="North India / Rajasthan / NCR", pincode_prefix="30", specialties="Jaipur Blue Pottery, Terracotta, Glazed Ceramics", rating=4.95, active_repairs_count=0, contact_info="jaipur.repairs@kalakriti.in"),
                RepairPartner(name="Eastern India Metal & Patina Care Guild", region="Odisha, Bihar, Chhattisgarh", pincode_prefix="84", specialties="Dhokra Bell Metal, Bronze Patina, Copper Casting", rating=4.88, active_repairs_count=0, contact_info="eastern.metal@kalakriti.in")
            ])

            await session.commit()
            logger.info("🎉 [Database Init] Database successfully populated with Indian handicraft catalog!")
    except Exception as e:
        logger.error(f"❌ [Database Init] Seeding error: {e}")
