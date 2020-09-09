import {
  Navigation,
  NavigationItem,
} from '@/lib/abstract/features/navigation/domain';

interface NavigationProps {
  id: string;
  title: string;
  name: string;
  items: NavigationItem[];
}

export class NavigationModel implements Navigation {
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
