import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';

@Controller('cities')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get('popular')
  async getPopularCities(@Query('country') country?: string): Promise<City[]> {
    return this.cityService.getPopularCities(country);
  }

  @Get('search')
  async searchCities(
    @Query('q') query: string,
    @Query('country') country?: string,
  ): Promise<City[]> {
    if (!query || query.length < 2) {
      return [];
    }
    return this.cityService.searchCities(query, country);
  }

  @Get('detect')
  async detectCity(): Promise<City | null> {
    // В реальном приложении получать IP из запроса
    return this.cityService.detectCityByIp('127.0.0.1');
  }
}
