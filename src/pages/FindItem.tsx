import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, MapPin, Clock3, Sparkles } from 'lucide-react'
import { detections } from '../data/mock'

function FindItem() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const results = useMemo(() => query.trim() ? detections.filter(d => d.object.toLowerCase().includes(query.toLowerCase())) : detections, [query])

  return (
    <div className="page">
      <div className="page-heading"><div><p className="eyebrow">AI SEARCH</p><h1>Find My Item</h1><p>Search detected objects across all CCTV cameras.</p></div></div>
      <div className="find-layout">
        <div className="card search-card">
          <div className="search-hero"><div className="ai-icon"><Sparkles size={25}/></div><div><h2>What are you looking for?</h2><p>Enter an item name and FINDCAM will search detection history.</p></div></div>
          <label>Object / Item</label>
          <div className="big-search"><Search size={21}/><input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && setSearched(true)} placeholder="e.g. keys, phone, wallet..." /></div>
          <div className="filter-row"><select><option>All Cameras</option><option>Camera 01</option><option>Camera 02</option><option>Camera 03</option></select><select><option>Today</option><option>Yesterday</option><option>Last 7 days</option></select><button className="primary-btn" onClick={() => setSearched(true)}><Search size={18}/> Find Item</button></div>
        </div>

        <div className="results-area">
          <div className="results-header"><div><h2>{searched || query ? `Found ${results.length} results` : 'Recent detections'}</h2><span>AI confidence ≥ 80%</span></div><button className="filter-btn"><SlidersHorizontal size={17}/> Filter</button></div>
          {results.map(d => <div className="card result-card" key={d.id}><img src={d.snapshot} alt={d.object}/><div className="result-main"><div className="result-title"><span className="object-icon small">{d.icon}</span><div><h3>{d.object}</h3><span>{d.camera}</span></div><b className="confidence-tag">{d.confidence}%</b></div><div className="result-details"><span><MapPin size={15}/>{d.location}</span><span><Clock3 size={15}/>{d.time}</span></div><button className="text-btn">View Detection →</button></div></div>)}
          {results.length === 0 && <div className="empty-state">No matching objects found.</div>}
        </div>
      </div>
    </div>
  )
}

export default FindItem