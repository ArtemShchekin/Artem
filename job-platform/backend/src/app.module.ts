import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { CityModule } from './city/city.module';

// Импорт сущностей
import { User } from './user/user.entity';
import { CandidateProfile } from './candidate/candidate-profile.entity';
import { EmployerProfile } from './employer/employer-profile.entity';
import { City } from './city/city.entity';
import { Education } from './candidate/education.entity';
import { WorkExperience } from './candidate/work-experience.entity';
import { DriverInfo } from './candidate/driver-info.entity';
import { Transaction } from './payment/transaction.entity';
import { ProfileView } from './payment/profile-view.entity';

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
    CityModule,
  ],
})
export class AppModule {}
