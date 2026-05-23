import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { EmployerModule } from './employer/employer.module';
import { CityModule } from './city/city.module';
import { PaymentModule } from './payment/payment.module';

// Импорт сущностей
import { User } from './user/entities/user.entity';
import { CandidateProfile } from './candidate/entities/candidate-profile.entity';
import { EmployerProfile } from './employer/entities/employer-profile.entity';
import { City } from './city/entities/city.entity';
import { Education } from './candidate/entities/education.entity';
import { WorkExperience } from './candidate/entities/work-experience.entity';
import { DriverInfo } from './candidate/entities/driver-info.entity';
import { Transaction, ProfileView } from './payment/entities/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'job_platform'),
        entities: [
          User,
          CandidateProfile,
          EmployerProfile,
          City,
          Education,
          WorkExperience,
          DriverInfo,
          Transaction,
          ProfileView,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CandidateModule,
    EmployerModule,
    CityModule,
    PaymentModule,
  ],
})
export class AppModule {}
