export interface PageComponentProps {
  id: string;
  type: string;
}

export class PageComponent {
  constructor(private props: PageComponentProps) {}

  get id(): string {
    return this.props.id;
  }

  get type(): string {
    return this.props.type;
  }
}
