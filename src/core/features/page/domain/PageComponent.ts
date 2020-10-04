export interface PageComponentProps {
  id: string;
  type: string;
  data: {
    [key: string]: any;
  };
}

export class PageComponent {
  constructor(private props: PageComponentProps) {}

  get id(): string {
    return this.props.id;
  }

  get type(): string {
    return this.props.type;
  }

  get data(): any {
    return this.props.data;
  }
}
