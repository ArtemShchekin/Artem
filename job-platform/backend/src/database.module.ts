import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
