interface CategoryProps {
  name: string;
  parent?: Category;
}

export class Category {
  id: string;
  name: string;
  parent?: Category;

  constructor({ name, parent }: CategoryProps) {
    this.name = name;
    this.parent = parent;
  }
}
