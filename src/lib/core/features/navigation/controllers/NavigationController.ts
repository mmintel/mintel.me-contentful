import { LocaleParser } from '@/lib/core/utils';
import { NavigationName } from '../domain';
import { NavigationDTO } from '../dtos';
import { NavigationMapper } from '../mappers';
import { GetNavigationUseCase } from '../usecases';

export class NavigationController {
  constructor(private getNavigation: GetNavigationUseCase) {}

  async getMainNavigation(locale: string): Promise<NavigationDTO> {
    const localeParser = new LocaleParser(locale);
    const navigation = await this.getNavigation.execute({
      locale: localeParser.parse(),
      name: NavigationName.MAIN_NAVIGATION,
    });
    const mapper = new NavigationMapper(navigation);
    return mapper.toDTO();
  }
}
