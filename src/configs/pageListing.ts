interface PageListingItemBase {
  title: string;
  date?: Date;
  tags?: string[];
}

export type PageListingItem = PageListingItemBase &
  ({ slug: string; url?: never } | { url: string; slug?: never });
