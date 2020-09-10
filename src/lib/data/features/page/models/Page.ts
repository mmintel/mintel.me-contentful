import { Page } from '@/lib/core/features/page/domain';

interface PageProps {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export class PageModel implements Page {
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
}
