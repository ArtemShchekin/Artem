import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../user/user.entity';
import { Candidate } from '../candidate/candidate.entity';
import { Employer } from '../employer/employer.entity';

export interface RegisterDto {
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
}

export interface LoginDto {
  email?: string;
  phone?: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        dto.email ? { email: dto.email } : {},
        dto.phone ? { phone: dto.phone } : {},
      ].filter(Boolean),
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email или телефоном уже существует');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      role: dto.role,
      isVerified: false,
    });

    await this.userRepository.save(user);

    // Создаем профиль в зависимости от роли
    if (dto.role === UserRole.CANDIDATE) {
      await this.candidateRepository.save({ userId: user.id });
    } else {
      await this.employerRepository.save({ userId: user.id });
    }

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [
        dto.email ? { email: dto.email } : {},
        dto.phone ? { phone: dto.phone } : {},
      ].filter(Boolean),
      relations: ['candidate', 'employer'],
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, role: user.role, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
