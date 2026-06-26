import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleCreateThreadClick = () => {
    if (!authUser) {
      navigate('/login');
    } else {
      navigate('/new');
    }
  };

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean))
  );

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <div className="main-content">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <h2 className="section-title">Diskusi tersedia</h2>
      
      <ThreadList threads={filteredThreads} />

      <button
        onClick={handleCreateThreadClick}
        className="floating-btn"
        title="Buat Diskusi Baru"
        aria-label="Create new thread"
        id="floating-add-thread"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}

export default HomePage;
