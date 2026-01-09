import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, deleteEvent } from '../api/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetchEvents();
    setEvents(res.data);
  };

  const submit = async () => {
    await createEvent(form);
    setForm({ title: '', description: '', date: '', time: '', venue: '' });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await deleteEvent(id);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Events</h2>

      <div className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          className="border p-2 w-full"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </div>

      {events.map((e) => (
        <div key={e.id} className="border p-4 mb-3 rounded">
          <h4 className="font-bold">{e.title}</h4>
          <p className="text-sm">{e.date} @ {e.time} | {e.venue}</p>
          <p className="mt-2">{e.description}</p>

          <button
            onClick={() => remove(e.id)}
            className="text-red-600 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Events;
