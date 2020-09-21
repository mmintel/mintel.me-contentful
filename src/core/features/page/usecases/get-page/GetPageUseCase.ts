import { UseCase } from '@/core/definitions';
import { Page } from '../../domain';
import { GetPageRequest } from './GetPageRequest';

export type GetPageUseCase = UseCase<GetPageRequest, Page>;
