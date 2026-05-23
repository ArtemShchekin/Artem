import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { EmployerModule } from './employer/employer.module';
import { CityModule } from './city/city.module';
import { PaymentModule } from './payment/payment.module';

// Импорт сущностей (будут созданы далее)
import { User } from './user/user.entity';
import { Candidate } from './candidate/candidate.entity';
import { Employer } from './employer/employer.entity';
import { City } from './city/city.entity';
import { Education } from './candidate/education.entity';
import { WorkExperience } from './candidate/work-experience.entity';
import { DriverInfo } from './candidate/driver-info.entity';
import { Transaction } from './payment/transaction.entity';

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
          Candidate,
          Employer,
          City,
          Education,
          WorkExperience,
          DriverInfo,
          Transaction,
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
