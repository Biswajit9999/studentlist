import { useState } from "react";
import "./App.css";

const GRADES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
  "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
];

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !age || !grade) return;

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age,
      grade,
    };

    setStudents((prev) => [...prev, newStudent]);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setGrade("");
  };

  const handleRemove = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Student Entry Form</h1>
        <p className="subtitle">Add students and review the list below.</p>

        <form onSubmit={handleSubmit}>
          <div className="fields">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="e.g. MS Dhoni"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Age
              <input
                type="number"
                name="age"
                placeholder="e.g. 14"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>

            <label>
              Grade
              <select
                name="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <option value="">Select grade</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">
              Add Student
            </button>
            <button type="button" className="btn secondary" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>

        {students.length === 0 ? (
          <div className="empty">No students added yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>
                      <button
                        type="button"
                        className="btn danger"
                        onClick={() => handleRemove(student.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;