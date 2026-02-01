import { useEffect, useState } from 'react';

function App() {
  const [links, setLinks] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');

  const API_URL = "http://localhost:3001/links";

  const carregarLinks = () => {
    fetch(API_URL).then(res => res.json()).then(data => setLinks(data));
  };

  const salvarLink = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, url })
    });
    setTitulo(''); setUrl('');
    carregarLinks();
  };

  useEffect(() => { carregarLinks(); }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🔗 Meus Links Integradores</h1>
      <form onSubmit={salvarLink} style={{ marginBottom: '20px' }}>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        <input placeholder="URL (https://...)" value={url} onChange={e => setUrl(e.target.value)} required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {links.map(link => (
          <li key={link.id}><a href={link.url} target="_blank">{link.titulo}</a></li>
        ))}
      </ul>
    </div>
  );
}
export default App;