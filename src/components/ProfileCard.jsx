import React from 'react'

export default function ProfileCard({ profile, onOpen }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={onOpen}
    >
      <div className="flex items-center gap-4">
        <img src={profile.avatar} alt={profile.name} className="w-14 h-14 rounded-full object-cover border" />
        <div>
          <h3 className="font-semibold">{profile.name}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-300">{profile.role}</div>
          <div className="text-xs text-gray-400 dark:text-gray-400">{profile.city} • {profile.area}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {profile.skills.slice(0,4).map((s, idx) => (
          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{s}</span>
        ))}
      </div>

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {profile.bio}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Recomendações: <span className="font-medium">{profile.recommended || 0}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Mensagens: <span className="font-medium">{(profile.messages||[]).length}</span>
        </div>
      </div>
    </div>
  )
}
