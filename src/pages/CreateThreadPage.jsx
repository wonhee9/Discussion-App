import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { asyncAddThread } from '../states/threads/slice';

function CreateThreadPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      try {
        await dispatch(asyncAddThread({ title, body, category }));
        navigate('/');
      } catch {
        // empty catch
      }
    }
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="card form-container" style={{ maxWidth: '600px' }} id="create-thread-container">
        <h2 className="form-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          Buat Diskusi Baru
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Judul Diskusi
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder="Masukkan judul diskusi..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Kategori / Tag
            </label>
            <input
              type="text"
              id="category"
              className="form-input"
              placeholder="Contoh: react, javascript, css (opsional)..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Isi Diskusi
            </label>
            <textarea
              id="body"
              className="form-input form-textarea"
              placeholder="Tuliskan detail diskusi Anda di sini..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              style={{ minHeight: '180px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <Save size={18} />
            <span>Buat Thread</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
