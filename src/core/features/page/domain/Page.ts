import { PageComponent } from './PageComponent';

export interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: PageComponent[];
  parentID?: string;
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

  get components(): PageComponent[] {
    return this.props.components;
  }

  get parentID(): string | undefined {
    return this.props.parentID;
  }

  get parent(): Page | undefined {
    return this._parent;
  }

  setParent(page: Page): void {
    this._parent = page;
  }
}
