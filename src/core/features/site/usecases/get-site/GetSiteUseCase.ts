import { UseCase } from '@/core/definitions';
import { SiteDTO } from '../../dtos';
import { GetSiteRequestDTO } from './GetSiteRequestDTO';

export type GetSiteUseCase = UseCase<GetSiteRequestDTO, SiteDTO>;
