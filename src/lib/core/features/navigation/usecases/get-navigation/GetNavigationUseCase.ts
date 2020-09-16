import { UseCase } from '@/lib/core/definitions';
import { NavigationDTO } from '../../dtos';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';

export type GetNavigationUseCase = UseCase<
  GetNavigationRequestDTO,
  NavigationDTO
>;
