import { Locale } from '@/lib/abstract/definitions';
import { GraphqlService, DataService } from '@/lib/abstract/services';

interface ContentfulCollection<T extends JSONValue> extends JSONObject {
  items: T[];
}

export class ContentfulDataService implements DataService {
  constructor(
    protected graphqlService: GraphqlService,
    protected locale: Locale,
  ) {}

  getCollection<Response>(
    query: any,
    data: any,
  ): ContentfulCollection<Response> {
    return this.graphqlService.request<ContentfulCollection<Response>>(
      NavigationQuery,
      {
        locale: this.locale,
        ...data,
      },
    );
  }
}
