import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateProfile } from './candidate-profile.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { DriverInfo } from './driver-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateProfile, Education, WorkExperience, DriverInfo]),
  ],
  exports: [TypeOrmModule],
})
export class CandidateModule {}
