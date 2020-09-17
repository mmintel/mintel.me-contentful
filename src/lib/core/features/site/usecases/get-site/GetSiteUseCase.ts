import { UseCase } from '@/lib/core/definitions';
import { SiteDTO } from '../../dtos';

export type GetSiteUseCase = UseCase<void, SiteDTO>;
