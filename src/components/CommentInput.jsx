import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

function CommentInput({ authUser, addComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  if (!authUser) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
        <p>
          Ada tanggapan?{' '}
          <Link to="/login" style={{ fontWeight: 600, textDecoration: 'underline' }}>
            Masuk terlebih dahulu
          </Link>{' '}
          untuk memberikan komentar.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} id="comment-form">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="comment-content" className="form-label" style={{ fontSize: '1rem' }}>
            Beri Tanggapan
          </label>
          <textarea
            id="comment-content"
            className="form-input form-textarea"
            placeholder="Tulis tanggapan Anda di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ minHeight: '80px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
          <Send size={16} />
          <span>Kirim</span>
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  authUser: PropTypes.object,
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
