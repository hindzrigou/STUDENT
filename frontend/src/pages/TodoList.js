import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // CSS mis à jour ci-dessous

export default function Organization() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const todoRef = useRef(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // ---------------- PLANNER ----------------
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [newDate, setNewDate] = useState("");

  const addEvent = () => {
    if (newEvent.trim() === "" || newDate.trim() === "") return;
    setEvents([...events, { text: newEvent, date: newDate }]);
    setNewEvent("");
    setNewDate("");
  };

  const editEvent = (index, newText, newDateValue) => {
    const updated = [...events];
    updated[index] = { text: newText, date: newDateValue };
    setEvents(updated);
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  // ---------------- POMODORO ----------------
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Organization & Tools
      </h1>

      {/* POMODORO */}
      <div className="bg-white shadow-md rounded-2xl p-4 text-center max-w-sm mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2">Pomodoro Timer</h2>
        <div className="text-3xl font-bold mb-2">{formatTime(time)}</div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
          >
            Pause
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TO-DO */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 p-2 border rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => editTask(index, e.target.value)}
                    className={`flex-1 ml-2 bg-transparent outline-none ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  />
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 font-bold ml-2"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PLANNER */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Planner</h2>
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Event title..."
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={addEvent}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Event
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <ul>
              {events.map((event, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 p-2 border rounded-lg"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={event.text}
                      onChange={(e) =>
                        editEvent(index, e.target.value, event.date)
                      }
                      className="w-full bg-transparent outline-none mb-1"
                    />
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) =>
                        editEvent(index, event.text, e.target.value)
                      }
                      className="bg-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={() => deleteEvent(index)}
                    className="text-red-500 font-bold mt-2 md:mt-0 md:ml-2"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
