import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { asyncRegisterUser } from '../states/authUser/slice';

function RegisterPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      try {
        await dispatch(asyncRegisterUser({ name, email, password }));
        navigate('/login');
      } catch {
        // empty catch
      }
    }
  };

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card form-container" id="register-container">
        <h2 className="form-title">Daftar Akun Baru</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Masukkan nama lengkap..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password (minimal 6 karakter)
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Buat password Anda..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <UserPlus size={18} />
            <span>Daftar Akun</span>
          </button>
        </form>

        <p className="form-footer-text">
          Sudah punya akun?{' '}
          <Link to="/login" style={{ fontWeight: 600, textDecoration: 'underline' }}>
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
