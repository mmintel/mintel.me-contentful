interface NavigationProps {
  id: string;
  title: string;
  name: string;
  items: NavigationItem[];
}

export enum NavigationName {
  MAIN_NAVIGATION = 'main_navigation',
}

export class Navigation {
  constructor(private props: NavigationProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get name(): string {
    return this.props.id;
  }
}

export interface NavigationItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
