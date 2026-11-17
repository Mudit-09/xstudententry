import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = (e) => {
    e.preventDefault();

    if (!name.trim() || !age || !grade) return;

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age,
      grade,
    };

    setStudents((prev) => [...prev, newStudent]);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setAge("");
    setGrade("");
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="page">
      <main className="container">
        <header className="header">
          <h1>Student Entry Form</h1>
          <p>Add students and review the list below.</p>
        </header>

        <section className="form-card">
          <form onSubmit={addStudent}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. MS Dhoni"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                placeholder="e.g. 14"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <option value="">Select grade</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Class {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-group">
              <button type="submit" className="add-btn">
                Add Student
              </button>
              <button
                type="button"
                className="clear-btn"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="students-section">
          <h2>Student List</h2>

          {students.length === 0 ? (
            <p className="empty-state">No students added yet.</p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <div className="student-card" key={student.id}>
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>Age: {student.age}</p>
                    <p>Class {student.grade}</p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeStudent(student.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
