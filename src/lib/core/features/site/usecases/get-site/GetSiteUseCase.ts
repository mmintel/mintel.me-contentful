import { UseCase } from '@/lib/core/definitions';
import { SiteDTO } from '../../dtos';
import { GetSiteRequestDTO } from './GetSiteRequestDTO';

export type GetSiteUseCase = UseCase<GetSiteRequestDTO, SiteDTO>;
