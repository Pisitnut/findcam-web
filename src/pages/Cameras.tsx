import { Camera, MoreVertical, Settings2 } from 'lucide-react'
import { cameras } from '../data/mock'

function Cameras() {
  return (
    <div className="page">
      <div className="page-heading"><div><p className="eyebrow">MONITORING</p><h1>Cameras</h1><p>View and manage connected CCTV cameras.</p></div><button className="primary-btn"><Camera size={18}/> Add Camera</button></div>
      <div className="camera-grid">
        {cameras.map(c => (
          <div className="card camera-tile" key={c.id}>
            <div className="tile-video"><span className={`camera-state ${c.status === 'Online' ? 'online' : 'offline'}`}><i/> {c.status}</span><span className="tile-cam-name">{c.name}</span>{c.status === 'Online' ? <div className="mini-scene"><div className="mini-box">🔑</div></div> : <div className="offline-message">Camera offline</div>}</div>
            <div className="tile-body"><div><h3>{c.name}</h3><span>{c.location}</span></div><button className="icon-btn"><MoreVertical size={18}/></button></div>
            <div className="tile-meta"><span>Resolution <b>{c.resolution}</b></span><span>FPS <b>{c.fps}</b></span><button className="secondary-btn"><Settings2 size={15}/> Settings</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cameras