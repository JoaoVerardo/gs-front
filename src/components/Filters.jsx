import React from 'react'

export default function Filters({ areas, cities, skills, area, setArea, city, setCity, skill, setSkill, onClear }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <select value={area} onChange={e => setArea(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800">
        <option value="">Todas as áreas</option>
        {areas.map(a => <option key={a} value={a}>{a}</option>)}
      </select>

      <select value={city} onChange={e => setCity(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800">
        <option value="">Todas as cidades</option>
        {cities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={skill} onChange={e => setSkill(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800">
        <option value="">Todas as tecnologias</option>
        {skills.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <button onClick={onClear} className="p-2 border rounded bg-white dark:bg-gray-800">Limpar</button>
    </div>
  )
}
