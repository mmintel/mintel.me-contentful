import { NavigationItem } from './NavigationItem';

export interface NavigationProps {
  id: string;
  title: string;
  name: string;
  items: NavigationItem[];
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
    return this.props.name;
  }

  get items(): NavigationItem[] {
    return this.props.items;
  }
}
