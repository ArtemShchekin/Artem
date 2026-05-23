import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { Candidate } from './candidate.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { DriverInfo } from './driver-info.entity';
import { User } from '../user/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Education, WorkExperience, DriverInfo, User]),
    AuthModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
