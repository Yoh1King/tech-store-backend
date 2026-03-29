import type { Category } from "@/lib/api";

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onSelect(null)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        selected === null
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      All
    </button>
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id === selected ? null : cat.id)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected === cat.id
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
