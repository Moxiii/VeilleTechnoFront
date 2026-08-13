import { FilterItem } from "@interfaces/SharedLayout/FilterInterface";
import "./SharedLayout.scss";

import { motion } from "framer-motion";

interface SharedLayoutProps<T> {
  filterPath: FilterItem[];
  availableFilters: FilterItem[];
  onSelectFilter: (filter: FilterItem) => void;
  onRemoveFilter: (index: number) => void;
  onReset: () => void;
  children: React.ReactNode;
}
export default function SharedLayout<T>({
  filterPath,
  availableFilters,
  onSelectFilter,
  onRemoveFilter,
  onReset,
  children,
}: SharedLayoutProps<T>) {
  return (
    <section className="sharedLayoutContainer">
      <nav className="sharedLayoutNav">
        <div className="filterPath">
          <button onClick={onReset}>Tous</button>

          {filterPath.map((filter, index) => (
            <div key={`${filter.key}-${filter.value}`}>
              <span>›</span>

              <button onClick={() => onRemoveFilter(index)}>
                {filter.label}
              </button>
            </div>
          ))}
        </div>

        <ul className="tabsContainer">
          {availableFilters.map((filter) => (
            <li key={`${filter.key}-${filter.value}`}>
              <motion.button onClick={() => onSelectFilter(filter)}>
                {filter.label}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="sharedLayoutMain">{children}</main>
    </section>
  );
}
