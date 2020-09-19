import { Page } from '../domain';
import { PageDTO } from '../dtos';

export class PageMapper {
  constructor(private page: Page) {}

  toDTO(): PageDTO {
    return {
      id: this.page.id,
      components: this.page.components,
      description: this.page.description,
      slug: this.page.slug,
      title: this.page.title,
    };
  }
}
