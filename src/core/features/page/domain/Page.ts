import { PageDTO } from '../dtos';

interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: any;
}

export class Page {
  constructor(private props: PageProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get components(): any {
    return this.props.components.json;
  }

  toDTO(page: Page): PageDTO {
    return {
      id: page.id,
      title: page.title,
      slug: page.slug,
      description: page.description,
      components: page.components,
    };
  }
}
