export interface Category {
  id: string;
  parent: Category | null;
  name: string;
}
