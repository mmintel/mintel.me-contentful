import { UseCase } from '@/core/definitions';
import { Page } from '../../domain';
import { GetAllPagesRequest } from './GetAllPagesRequest';

export type GetAllPagesUseCase = UseCase<GetAllPagesRequest, Page[]>;
