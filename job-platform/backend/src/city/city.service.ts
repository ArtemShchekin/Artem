import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async getPopularCities(country: string = 'Ирак'): Promise<City[]> {
    return this.cityRepository.find({
      where: { country, is_popular: true },
      order: { name: 'ASC' },
    });
  }

  async searchCities(query: string, country: string = 'Ирак'): Promise<City[]> {
    return this.cityRepository
      .createQueryBuilder('city')
      .where('city.country = :country', { country })
      .andWhere('city.name ILIKE :query', { query: `%${query}%` })
      .orderBy('city.name', 'ASC')
      .limit(10)
      .getMany();
  }

  async detectCityByIp(ip: string): Promise<City | null> {
    // Упрощенная реализация - в продакшене использовать GeoIP сервис
    return this.cityRepository.findOne({
      where: { is_popular: true },
      order: { name: 'ASC' },
    });
  }

  async seedPopularCities() {
    const popularCities = [
      { name: 'Багдад', country: 'Ирак', is_popular: true },
      { name: 'Басра', country: 'Ирак', is_popular: true },
      { name: 'Мосул', country: 'Ирак', is_popular: true },
      { name: 'Эрбиль', country: 'Ирак', is_popular: true },
      { name: 'Киркуук', country: 'Ирак', is_popular: true },
      { name: 'Наджаф', country: 'Ирак', is_popular: true },
      { name: 'Карбала', country: 'Ирак', is_popular: true },
      { name: 'Сулеймания', country: 'Ирак', is_popular: true },
    ];

    for (const cityData of popularCities) {
      const exists = await this.cityRepository.findOne({
        where: { name: cityData.name, country: cityData.country },
      });
      if (!exists) {
        await this.cityRepository.save(cityData);
      }
    }
  }
}
