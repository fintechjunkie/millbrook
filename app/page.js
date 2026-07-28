export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '80px 28px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '68ch', margin: '0 auto', color: '#F4EFE6' }}>
        <h1 style={{ fontSize: 30, margin: '0 0 10px', fontWeight: 700 }}>Millbrook</h1>
        <p style={{ color: '#A29AAC', fontSize: 15, lineHeight: 1.6 }}>
          Digital flipbooks and other assets for the Welcome to Millbrook project.
          Nothing is built yet.
        </p>
        <p style={{ color: '#A29AAC', fontSize: 15, lineHeight: 1.6 }}>
          <a href="/type-specimen" style={{ color: '#9E86F0' }}>Typeface specimen</a>
          {' '}— scaffolding, delete once the face is chosen.
        </p>
      </div>
    </main>
  );
}
