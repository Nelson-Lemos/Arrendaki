export function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line short" />
      </div>
    </div>
  )
}

export function BrowseSkeleton() {
  return (
    <div className="browse-page">
      <div style={{ background: 'var(--primary)', padding: '2.5rem 2rem 1.75rem' }} />
      <div className="browse-layout">
        <aside className="sidebar">
          {[1, 2, 3].map(i => (
            <div key={i} style={{ marginBottom: '1.75rem' }}>
              <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 10, width: '80%', marginBottom: 6 }} />
              <div className="skeleton" style={{ height: 10, width: '70%', marginBottom: 6 }} />
              <div className="skeleton" style={{ height: 10, width: '75%' }} />
            </div>
          ))}
        </aside>
        <main className="properties-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </main>
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <div className="skeleton" style={{ height: 20, width: 120, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 400, width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 32, width: '60%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 16, width: '40%', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 80, width: '100%', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 100, width: '100%' }} />
    </div>
  )
}
