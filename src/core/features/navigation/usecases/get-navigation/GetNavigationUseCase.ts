import { UseCase } from '@/core/definitions';
import { Navigation } from '../../domain';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';

export type GetNavigationUseCase = UseCase<GetNavigationRequestDTO, Navigation>;
