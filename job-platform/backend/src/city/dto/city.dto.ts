import { IsOptional, IsString, MinLength } from 'class-validator';

export class GetPopularCitiesDto {
  @IsOptional()
  @IsString()
  country?: string = 'Ирак';
}

export class SearchCitiesDto {
  @IsString()
  @MinLength(2)
  q!: string;

  @IsOptional()
  @IsString()
  country?: string = 'Ирак';
}
