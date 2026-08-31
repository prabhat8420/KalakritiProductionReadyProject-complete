export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_category_id?: string;
  subcategories?: Category[];
}

export interface SubCategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
}
