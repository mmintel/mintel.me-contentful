import { NavigationItem } from './NavigationItem';

export interface NavigationProps {
  id: string;
  title: string;
  name: string;
  itemIDs: string[];
}

export class Navigation {
  private _items: NavigationItem[] = [];

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

  get itemIDs(): string[] {
    return this.props.itemIDs;
  }

  get items(): NavigationItem[] {
    return this._items;
  }

  addItem(item: NavigationItem): void {
    const existingItem = this._items.find((i) => i.id === item.id);
    if (!existingItem) {
      this._items.push(item);
    }
  }
}
