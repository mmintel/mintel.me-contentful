import { Page } from '../../page/domain';

export interface NavigationItemProps {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  pageID?: string;
}

export interface NavigationItemPage {
  id: string;
  slug: string;
  title: string;
}

export class NavigationItem {
  private _page: Page | undefined;

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

  get pageID(): string | undefined {
    return this.props.pageID;
  }

  get page(): Page | undefined {
    return this._page;
  }

  setPage(page: Page): void {
    this._page = page;
  }
}
