import { BarChart3, TrendingUp, Target, Package } from 'lucide-react'

const objects = [
  ['Keys', 32], ['Phone', 27], ['Wallet', 19], ['Bag', 15], ['Laptop', 11]
]

function Statistics() {
  return (
    <div className="page">
      <div className="page-heading"><div><p className="eyebrow">ANALYTICS</p><h1>Statistics</h1><p>Understand detection patterns and lost-item frequency.</p></div><select className="period-select"><option>This Week</option><option>This Month</option><option>This Year</option></select></div>
      <div className="stats-grid"><Stat icon={<BarChart3/>} title="Total Detections" value="128"/><Stat icon={<Target/>} title="Avg. Confidence" value="94.6%"/><Stat icon={<Package/>} title="Most Detected" value="Keys"/><Stat icon={<TrendingUp/>} title="Detection Growth" value="+18%"/></div>
      <div className="analytics-grid">
        <div className="card chart-card"><div className="card-header"><div><h2>Detected Objects</h2><span>Frequency this week</span></div></div><div className="bar-chart">{objects.map(([name, value]) => <div className="bar-item" key={name}><div className="bar-value">{value}</div><div className="bar-track"><div className="bar-fill" style={{height: `${Number(value) * 2.5}px`}}/></div><span>{name}</span></div>)}</div></div>
        <div className="card"><div className="card-header"><div><h2>Activity by Day</h2><span>Detection volume</span></div></div><div className="activity-chart">{[55, 72, 48, 85, 68, 92, 60].map((h, i) => <div className="activity-col" key={i}><div className="activity-bar" style={{height: `${h}px`}}/><span>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span></div>)}</div></div>
      </div>
    </div>
  )
}

function Stat({icon, title, value}: {icon: React.ReactNode, title: string, value: string}) {
 return <div className="stat-card"><div className="stat-icon">{icon}</div><div className="stat-main"><span>{title}</span><b>{value}</b><small>Updated today</small></div></div>
}
export default Statistics