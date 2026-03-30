import { categories } from "../data/products";

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? "cat-btn cat-active" : "cat-btn"}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
