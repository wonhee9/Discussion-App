
import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="card sidebar-widget" id="category-filter-widget">
      <h3 className="sidebar-title">Kategori popular</h3>
      <div className="category-list">
        <button
          onClick={() => onCategoryChange('')}
          className={`category-filter-btn ${selectedCategory === '' ? 'active' : ''}`}
        >
          semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
