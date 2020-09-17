import { UseCase } from '@/lib/core/definitions';
import { PageDTO } from '../../dtos';
import { GetPageRequestDTO } from './GetPageRequestDTO';

export type GetPageUseCase = UseCase<GetPageRequestDTO, PageDTO>;
