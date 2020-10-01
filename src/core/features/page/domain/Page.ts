export interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
}

export class Page {
  private _parent?: Page;

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

  get parent(): Page | undefined {
    return this._parent;
  }

  /**
   * adds one or multiple parents to the page
   */

  addGeneration(page: Page): void {
    if (this.parent) {
      this.parent.addGeneration(page);
    } else {
      this._parent = page;
    }
  }
}
