export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No students found</p>
        <small>Add your first student record using the form on the left</small>
      </div>
    );
  }

  const getDeptClass = (dept) => {
    const d = (dept || '').toLowerCase();
    if (d.includes('comp') || d.includes('cs')) return 'badge-cs';
    if (d.includes('elect')) return 'badge-ee';
    if (d.includes('mech')) return 'badge-me';
    if (d.includes('civil')) return 'badge-ce';
    return 'badge-default';
  };

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="student-row">
              <td>
                <div className="student-profile">
                  <div className="avatar-circle">
                    {(s.name || 'S').trim().charAt(0).toUpperCase()}
                  </div>
                  <span className="student-name">{s.name}</span>
                </div>
              </td>
              <td>
                <span className="id-badge">{s.studentId}</span>
              </td>
              <td className="text-muted-cell">{s.email}</td>
              <td>
                <span className={`dept-badge ${getDeptClass(s.department)}`}>
                  {s.department}
                </span>
              </td>
              <td>
                <span className="sem-pill">Sem {s.semester}</span>
              </td>
              <td className="text-muted-cell">{s.contact || '—'}</td>
              <td className="actions">
                <button onClick={() => onEdit(s)} className="btn-action btn-edit" title="Edit Student">
                  ✏️
                </button>
                <button onClick={() => onDelete(s._id)} className="btn-action btn-delete" title="Delete Record">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
