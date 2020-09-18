import { UseCase } from '@/lib/core/definitions';
import { PageDTO } from '../../dtos';

export type GetAllPagesUseCase = UseCase<void, PageDTO[]>;
