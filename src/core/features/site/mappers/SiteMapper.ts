import { Site } from '../domain';
import { SiteDTO } from '../dtos';

export class SiteMapper {
  constructor(private site: Site) {}

  toDTO(): SiteDTO {
    return {
      id: this.site.id,
      homepage: this.site.homepage,
      logo: this.site.logo,
      title: this.site.title,
    };
  }
}
