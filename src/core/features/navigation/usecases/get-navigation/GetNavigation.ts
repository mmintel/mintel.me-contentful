import { GetNavigationRequest } from './GetNavigationRequest';
import { NavigationNotFoundError } from './NavigationNotFoundError';
import { GetNavigationUseCase } from './GetNavigationUseCase';
import { Navigation } from '../../domain';
import { NavigationRepository } from '../../repositories/NavigationRepository';

export class GetNavigation implements GetNavigationUseCase {
  constructor(private navigationRepository: NavigationRepository) {}

  async execute(request: GetNavigationRequest): Promise<Navigation> {
    try {
      const navigation = await this.navigationRepository.find(
        request.locale,
        request.name,
      );
      return navigation;
    } catch (e) {
      throw new NavigationNotFoundError(e);
    }
  }
}
