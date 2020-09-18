import { UseCase } from '@/lib/core/definitions';
import { Page } from '../../domain';

export type GetAllPagesUseCase = UseCase<void, Page[]>;
