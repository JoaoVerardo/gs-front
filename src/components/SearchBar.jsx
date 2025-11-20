import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-3">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar por nome, cargo ou skill..."
        className="w-full p-3 rounded border bg-white dark:bg-gray-800 focus:ring focus:outline-none"
      />
    </div>
  )
}
