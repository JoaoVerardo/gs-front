import React, { useState } from 'react'

export default function ProfileModal({ profile, onClose, onRecommend, onSendMessage }) {
  const [message, setMessage] = useState('');
  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage('');
    alert('Mensagem enviada (simulada).');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative max-w-3xl w-full bg-white dark:bg-gray-800 rounded shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-4 border-b dark:border-gray-700 flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full object-cover border" />
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <div className="text-sm text-gray-600 dark:text-gray-300">{profile.role} • {profile.area}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{profile.city}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => { onRecommend(); alert('Profissional recomendado!'); }} className="px-3 py-1 rounded border bg-green-500 text-white">Recomendar</button>
            <button onClick={onClose} className="px-3 py-1 rounded border">Fechar</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h3 className="font-semibold mb-2">Sobre</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">{profile.bio}</p>

            <h4 className="mt-3 font-medium">Educação</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">{profile.education}</div>

            <h4 className="mt-3 font-medium">Experiência</h4>
            {profile.experience.map((e, i) => (
              <div key={i} className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <div className="font-medium">{e.title} • {e.company}</div>
                <div className="text-xs">{e.period}</div>
                <div className="text-xs">{e.description}</div>
              </div>
            ))}
          </section>

          <aside>
            <h3 className="font-semibold mb-2">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, idx) => <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{s}</span>)}
            </div>

            <h3 className="font-semibold mt-4 mb-2">Soft skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((s, idx) => <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{s}</span>)}
            </div>

            <h3 className="font-semibold mt-4 mb-2">Hobbies</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">{profile.hobbies.join(', ')}</div>

            <div className="mt-4">
              <h4 className="font-medium">Enviar mensagem</h4>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Escreva uma mensagem curta..."
                className="w-full mt-2 p-2 border rounded bg-white dark:bg-gray-700 text-sm"
                rows={4}
              />
              <div className="flex gap-2 mt-2">
                <button onClick={handleSend} className="px-3 py-1 bg-blue-600 text-white rounded">Enviar</button>
                <button onClick={() => { setMessage(''); }} className="px-3 py-1 border rounded">Limpar</button>
              </div>
            </div>
          </aside>
        </div>

        <div className="p-3 border-t text-sm text-gray-600 dark:text-gray-400">
          Recomendações: <strong>{profile.recommended || 0}</strong> • Mensagens: <strong>{(profile.messages||[]).length}</strong>
        </div>
      </div>
    </div>
  )
}
