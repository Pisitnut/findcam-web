import { CalendarDays, Search } from 'lucide-react'
import { detections } from '../data/mock'

function History() {
  return (
    <div className="page">
      <div className="page-heading"><div><p className="eyebrow">AI EVENTS</p><h1>Detection History</h1><p>Review all objects detected by FINDCAM.</p></div></div>
      <div className="card table-card">
        <div className="table-toolbar"><div className="table-search"><Search size={18}/><input placeholder="Search object..."/></div><button className="secondary-btn"><CalendarDays size={16}/> Today</button></div>
        <div className="table-wrap"><table><thead><tr><th>OBJECT</th><th>CAMERA</th><th>LOCATION</th><th>CONFIDENCE</th><th>TIME</th><th>STATUS</th></tr></thead><tbody>{detections.map(d => <tr key={d.id}><td><span className="table-object">{d.icon}</span><b>{d.object}</b></td><td>{d.camera}</td><td>{d.location}</td><td><div className="progress"><span style={{width: `${d.confidence}%`}}/></div><b>{d.confidence}%</b></td><td>{d.time}</td><td><span className="success-tag">Detected</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  )
}

export default History