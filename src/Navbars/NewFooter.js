import React from 'react'

export default function NewFooter() {
  return (
    <div style={{ position: 'relative', minHeight: '30vh' }}>
      <div className="col-10 offset-1" style={{ overflow: 'hidden', marginTop: 'auto', bottom: 0, display: 'flex', flexDirection: 'column' }}>
        <footer className="py-2" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#f5f5f5' }}>
          <p className="text-center fw-normal mt-2 mb-1">Maker Checker © 2023 Company, Pune</p>
        </footer>
      </div>
    </div>
  )
}

