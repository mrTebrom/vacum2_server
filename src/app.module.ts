import { PromoModule } from './promo/promo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { Role } from './role/role.model';
import { UserRole } from './role/user-role.model';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/attribute.model';
import { AttributeController } from './attribute/attribute.controller';
import { AttributeService } from './attribute/attribute.service';
import { Product } from './product/product.model';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { Category } from './category/category.model';
import { CategoryAttribute } from './attribute/category-attribute';
import { ProductAttribute } from './attribute/product-attribute';
import { SliderModule } from './slider/slider.module';
import { Slider } from './slider/slider.model';
import { Promo } from './promo/promo.model';
import { PromoController } from './promo/promo.controller';
import { PromoService } from './promo/promo.service';
import { OrderModule } from './order/order.module';
import { PromocodeModule } from './promocode/promocode.module';
import { Promocode } from './promocode/promocode.model';
@Module({
  imports: [
    PromoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [
        User,
        Role,
        UserRole,
        Attribute,
        Product,
        Category,
        Slider,
        CategoryAttribute,
        ProductAttribute,
        Promo,
        Promocode
      ],
      logging: false,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    AttributeModule,
    ProductModule,
    SliderModule,
    PromoModule,
    OrderModule,
    PromocodeModule
  ],
  controllers: [
    AppController,
    UserController,
    RoleController,
    AuthController,
    AttributeController,
    ProductController,
    PromoController
  ],
  providers: [
    AppService,
    UserService,
    RoleService,
    AuthService,
    AttributeService,
    ProductService,
    PromoService
  ],
})
export class AppModule { }
