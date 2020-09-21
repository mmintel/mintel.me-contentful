import { Page } from '../../page/domain';

export interface NavigationItemProps {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: Page;
}

export class NavigationItem {
  constructor(private props: NavigationItemProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get internal(): boolean {
    return this.props.internal;
  }

  get url(): string | undefined {
    return this.props.url;
  }

  get page(): Page | undefined {
    return this.props.page;
  }
}
