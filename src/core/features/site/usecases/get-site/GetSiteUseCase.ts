import { UseCase } from '@/core/definitions';
import { Site } from '../../domain';
import { GetSiteRequestDTO } from './GetSiteRequestDTO';

export type GetSiteUseCase = UseCase<GetSiteRequestDTO, Site>;
