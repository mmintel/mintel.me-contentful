import { Page } from '../domain';
import { PageDTO } from '../dtos';
import { PageComponentMapper } from './PageComponentMapper';

export class PageMapper {
  constructor(private page: Page) {}

  toDTO(): PageDTO {
    return {
      id: this.page.id,
      description: this.page.description,
      slug: this.page.slug,
      title: this.page.title,
      components: this.page.components.map((component) => {
        const mapper = new PageComponentMapper(component);
        return mapper.toDTO();
      }),
    };
  }
}
