interface SiteProps {
  id: string;
  title: string;
  logo: string;
  homepage: string;
}

export class Site {
  constructor(private props: SiteProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get logo(): string {
    return this.props.logo;
  }

  get homepage(): string {
    return this.props.homepage;
  }
}
