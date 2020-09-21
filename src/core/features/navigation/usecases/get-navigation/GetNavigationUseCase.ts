import { UseCase } from '@/core/definitions';
import { Navigation } from '../../domain';
import { GetNavigationRequest } from './GetNavigationRequest';

export type GetNavigationUseCase = UseCase<GetNavigationRequest, Navigation>;
