import { Activity, AlertTriangle, Camera, PackageSearch, ArrowUpRight } from 'lucide-react'
import { detections, cameras } from '../data/mock'

function Dashboard() {
  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1><p>Monitor your FINDCAM AI system in real time.</p></div>
        <div className="live-pill"><span/> LIVE SYSTEM</div>
      </div>

      <div className="stats-grid">
        <Stat title="Active Cameras" value="3 / 4" change="+1" icon={<Camera/>}/>
        <Stat title="Objects Detected" value="128" change="+18%" icon={<PackageSearch/>}/>
        <Stat title="Lost Item Alerts" value="12" change="+4" icon={<AlertTriangle/>}/>
        <Stat title="AI Accuracy" value="94.6%" change="+2.1%" icon={<Activity/>}/>
      </div>

      <div className="dashboard-grid">
        <div className="card camera-card">
          <div className="card-header"><div><h2>Live Camera</h2><span>Camera 01 · Living Room</span></div><div className="online-label"><span/> Online</div></div>
          <div className="video-placeholder">
            <div className="camera-overlay top-left">CAM 01</div>
            <div className="camera-overlay top-right">1080p · 10 FPS</div>
            <div className="fake-room"><div className="detection-box"><span>🔑 Keys · 94%</span></div></div>
            <div className="camera-overlay bottom-left">18:42:31</div>
            <div className="scan-line"/>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div><h2>Latest Detection</h2><span>Most recent AI results</span></div><ArrowUpRight size={19}/></div>
          <div className="detection-list">
            {detections.slice(0, 4).map(d => (
              <div className="detection-row" key={d.id}>
                <div className="object-icon">{d.icon}</div>
                <div className="detection-info"><b>{d.object}</b><span>{d.camera} · {d.location}</span></div>
                <div className="confidence"><b>{d.confidence}%</b><span>{d.time}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div className="stat-main"><span>{title}</span><b>{value}</b><small>{change} <em>this week</em></small></div></div>
}

export default Dashboard