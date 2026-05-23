import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forFeature([
      User,
      CandidateProfile,
      EmployerProfile,
      City,
      Education,
      WorkExperience,
      DriverInfo,
      Transaction,
      ProfileView,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
