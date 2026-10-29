import { useState, useEffect, useMemo } from 'react';
import { studentApi } from './api/studentApi';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await studentApi.getAll();
      setStudents(res.data || []);
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 'student-data') {
      loadStudents();
    }
  }, [currentPage]);

  const handleCreate = async (student) => {
    try {
      await studentApi.create(student);
      showMessage('✨ Student added successfully to MongoDB Atlas');
      loadStudents();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const handleUpdate = async (id, student) => {
    try {
      await studentApi.update(id, student);
      showMessage('✨ Student updated successfully in MongoDB Atlas');
      setEditingStudent(null);
      loadStudents();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student record?')) return;
    try {
      await studentApi.delete(id);
      showMessage('🗑️ Student record deleted successfully');
      loadStudents();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter((s) => {
      return (
        s.name?.toLowerCase().includes(term) ||
        s.studentId?.toLowerCase().includes(term) ||
        s.department?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term)
      );
    });
  }, [students, searchTerm]);

  const deptCount = useMemo(() => {
    const depts = new Set(students.map((s) => s.department).filter(Boolean));
    return depts.size;
  }, [students]);

  return (
    <div className="app">
      {/* Dynamic ambient glass glows */}
      <div className="bg-glow glow-top-left"></div>
      <div className="bg-glow glow-bottom-right"></div>
      <div className="bg-glow glow-center"></div>

      <header className="app-header glass-header">
        <div className="header-content">
          <div className="logo-group" onClick={() => setCurrentPage('home')}>
            <span className="logo-icon">🎓</span>
            <div className="logo-text">
              <span className="logo-title">Student Hub</span>
              <span className="logo-subtitle">Three-Tier Architecture</span>
            </div>
          </div>

          <div className="header-right">
            <div className="cloud-badge">
              <span className="pulse-dot"></span>
              <span className="cloud-badge-text">3-Tier Cloud Live</span>
            </div>
            {currentPage === 'student-data' ? (
              <button className="btn-nav" onClick={() => setCurrentPage('home')}>
                ← Home
              </button>
            ) : (
              <button className="btn-nav" onClick={() => setCurrentPage('student-data')}>
                Portal Data →
              </button>
            )}
          </div>
        </div>
      </header>

      {message.text && (
        <div className={`message glass-message ${message.type}`}>
          <span className="msg-icon">{message.type === 'error' ? '⚠️' : '🎉'}</span>
          <span>{message.text}</span>
        </div>
      )}

      <main className="main-content">
        {currentPage === 'home' ? (
          <Home onNavigate={setCurrentPage} />
        ) : (
          <div className="portal-wrapper">
            {/* Stats Overview Container */}
            <div className="stats-overview-bar glass-card">
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <div className="stat-info">
                  <span className="stat-value">{students.length}</span>
                  <span className="stat-label">Total Registered</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <span className="stat-icon">🏛️</span>
                <div className="stat-info">
                  <span className="stat-value">{deptCount}</span>
                  <span className="stat-label">Departments</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <span className="stat-icon">⚡</span>
                <div className="stat-info">
                  <span className="stat-value status-online">Operational</span>
                  <span className="stat-label">Render API Connected</span>
                </div>
              </div>
            </div>

            <div className="container">
              <section className="left-panel glass-card">
                <StudentForm
                  onSubmit={editingStudent ? handleUpdate : handleCreate}
                  editingStudent={editingStudent}
                  onCancel={() => setEditingStudent(null)}
                />
              </section>

              <section className="right-panel glass-card">
                <SearchBar value={searchTerm} onChange={setSearchTerm} count={filteredStudents.length} />
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    <span>Querying MongoDB Atlas via Render...</span>
                  </div>
                ) : (
                  <StudentList students={filteredStudents} onEdit={setEditingStudent} onDelete={handleDelete} />
                )}
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer glass-footer">
        <div className="footer-status-pill">
          <span className="pulse-dot green"></span>
          <span><strong>Frontend:</strong> Vercel</span>
        </div>
        <div className="footer-divider">•</div>
        <div className="footer-status-pill">
          <span className="pulse-dot green"></span>
          <span><strong>Backend API:</strong> Render</span>
        </div>
        <div className="footer-divider">•</div>
        <div className="footer-status-pill">
          <span className="pulse-dot green"></span>
          <span><strong>Database:</strong> MongoDB Atlas</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
