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

  toJson() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      components: this.components,
    };
  }
}
