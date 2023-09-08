export type Link = {
  id: number;
  name: string;
  url: string;
};

export type LinksResponse = {
  links: Link[];
  totalPages: number;
};
