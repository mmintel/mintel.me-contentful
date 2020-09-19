import { UseCase } from '@/core/definitions';
import { Page } from '../../domain';
import { GetPageRequestDTO } from './GetPageRequestDTO';

export type GetPageUseCase = UseCase<GetPageRequestDTO, Page>;
