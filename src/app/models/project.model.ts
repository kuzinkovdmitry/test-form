export class ProjectModel {
  id: number;
  url: string;
  name: string;
  language: string;
  full_name: string;
  description: string;
  owner?: ProjectOwner;
}

export class ProjectOwner {
  avatar_url: string;
}
