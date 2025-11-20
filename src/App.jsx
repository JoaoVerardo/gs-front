import React, { useEffect, useState } from 'react'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import profilesData from './data/profiles.json'

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [query, setQuery] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');

  useEffect(() => setProfiles(profilesData), []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  const recommend = (id) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, recommended: (p.recommended||0)+1 } : p));
  };

  const sendMessage = (id, message) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, messages: [...(p.messages||[]), { text: message, when: new Date().toISOString() }] } : p));
  };

  const filtered = profiles.filter(p => {
    const q = query.trim().toLowerCase();
    if (q && !(p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.skills.join(' ').toLowerCase().includes(q))) return false;
    if (filterArea && p.area !== filterArea) return false;
    if (filterCity && p.city !== filterCity) return false;
    if (filterSkill && !p.skills.includes(filterSkill)) return false;
    return true;
  });

  const areas = [...new Set(profiles.map(p => p.area))].sort();
  const cities = [...new Set(profiles.map(p => p.city))].sort();
  const skills = [...new Set(profiles.flatMap(p => p.skills))].sort();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-6xl mx-auto gap-3">
        <div>
          <h1 className="text-6xl font-bold w-full text-center">FuturConnect</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Explore perfis, recomende e envie mensagens.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(d => !d)}
            className="px-3 py-1 border rounded bg-white/50 dark:bg-gray-800/60"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {filtered.length} perfil{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-4">
          <SearchBar value={query} onChange={setQuery} />
          <Filters
            areas={areas} cities={cities} skills={skills}
            area={filterArea} setArea={setFilterArea}
            city={filterCity} setCity={setFilterCity}
            skill={filterSkill} setSkill={setFilterSkill}
            onClear={() => { setFilterArea(''); setFilterCity(''); setFilterSkill(''); }}
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <ProfileCard key={p.id} profile={p} onOpen={() => setSelected(p)} />
          ))}
        </section>
      </main>

      {selected && (
        <ProfileModal
          profile={selected}
          onClose={() => setSelected(null)}
          onRecommend={() => { recommend(selected.id); }}
          onSendMessage={(msg) => { sendMessage(selected.id, msg); }}
        />
      )}
    </div>
  )
}
