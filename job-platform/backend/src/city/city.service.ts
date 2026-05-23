import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async getPopularCities(country: string = 'Ирак'): Promise<City[]> {
    return this.cityRepository.find({
      where: { country, isPopular: true },
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
      where: { isPopular: true },
      order: { name: 'ASC' },
    });
  }

  async seedPopularCities() {
    const popularCities = [
      { name: 'Багдад', country: 'Ирак', isPopular: true },
      { name: 'Басра', country: 'Ирак', isPopular: true },
      { name: 'Мосул', country: 'Ирак', isPopular: true },
      { name: 'Эрбиль', country: 'Ирак', isPopular: true },
      { name: 'Киркуук', country: 'Ирак', isPopular: true },
      { name: 'Наджаф', country: 'Ирак', isPopular: true },
      { name: 'Карбала', country: 'Ирак', isPopular: true },
      { name: 'Сулеймания', country: 'Ирак', isPopular: true },
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
