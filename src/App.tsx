import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  Bell,
  Bot,
  Camera,
  ChartNoAxesCombined,
  ChevronRight,
  Clock3,
  LayoutDashboard,
  Search,
  Settings,
  Menu,
  X,
  Map,
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import Cameras from './pages/Cameras'
import FindItem from './pages/FindItem'
import AIAssistant from './pages/AIAssistant'
import History from './pages/History'
import Statistics from './pages/Statistics'
import Heatmap from './pages/Heatmap'

// Mock Data
import { detections } from './data/mock'

const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    to: '/cameras',
    label: 'Cameras',
    icon: Camera,
  },
  {
    to: '/find',
    label: 'Find Item',
    icon: Search,
  },
  {
    to: '/assistant',
    label: 'AI Assistant',
    icon: Bot,
  },
  {
    to: '/history',
    label: 'Detection History',
    icon: Clock3,
  },
  {
    to: '/statistics',
    label: 'Statistics',
    icon: ChartNoAxesCombined,
  },
  {
    to: '/heatmap',
    label: 'Heatmap',
    icon: Map,
  },
]

function App() {
  const [open, setOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // แสดง Detection ล่าสุด 3 รายการ
  const latestDetections = detections
    .slice()
    .reverse()
    .slice(0, 3)

  return (
    <div className="app-shell">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`sidebar ${open ? 'open' : ''}`}
      >

        {/* Brand */}

        <div className="brand">

          <div className="brand-mark">
            <Search size={20} />
          </div>

          <div>
            <div className="brand-name">
              FINDCAM
            </div>

            <div className="brand-sub">
              AI Lost Item Detection
            </div>
          </div>

          <button
            className="icon-btn mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <div className="nav-title">
          MAIN MENU
        </div>

        <nav>

          {navItems.map(
            ({ to, label, icon: Icon }) => (

              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${
                    isActive ? 'active' : ''
                  }`
                }
              >

                <Icon size={19} />

                <span>
                  {label}
                </span>

                {label === 'Find Item' && (
                  <span className="nav-badge">
                    AI
                  </span>
                )}

              </NavLink>
            ),
          )}

        </nav>

        {/* Sidebar Bottom */}

        <div className="sidebar-bottom">

          <NavLink
            to="/settings"
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            <Settings size={19} />

            <span>
              Settings
            </span>
          </NavLink>

          <div className="system-status">

            <span className="status-dot" />

            <div>
              <b>
                System Online
              </b>

              <small>
                AI service connected
              </small>
            </div>

          </div>

        </div>

      </aside>

      {/* ================= MOBILE OVERLAY ================= */}

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* ================= TOPBAR ================= */}

        <header className="topbar">

          <button
            className="icon-btn mobile-menu"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumbs">

            <span>
              FINDCAM
            </span>

            <ChevronRight size={15} />

            <b>
              AI Monitoring
            </b>

          </div>

          <div className="top-actions">

            {/* ================= NOTIFICATION ================= */}

            <div className="notification-wrapper">

              <button
                className="icon-btn notification"
                onClick={() =>
                  setNotificationsOpen(
                    !notificationsOpen,
                  )
                }
                aria-label="Notifications"
              >

                <Bell size={20} />

                {/* Notification Dot */}

                {detections.length > 0 && (
                  <span className="notification-dot" />
                )}

              </button>

              {/* Notification Panel */}

              {notificationsOpen && (

                <div className="notification-panel">

                  {/* Header */}

                  <div className="notification-header">

                    <div>

                      <b>
                        Notifications
                      </b>

                      <span>
                        Latest AI detections
                      </span>

                    </div>

                    <span className="notification-count">
                      {detections.length}
                    </span>

                  </div>

                  {/* Latest Notifications */}

                  {latestDetections.map(
                    (detection) => (

                      <NavLink
                        key={detection.id}
                        to="/history"
                        className="notification-item"
                        onClick={() =>
                          setNotificationsOpen(
                            false,
                          )
                        }
                      >

                        <div className="notification-icon">
                          {detection.icon}
                        </div>

                        <div className="notification-content">

                          <b>
                            {detection.object} detected
                          </b>

                          <span>
                            {detection.camera} ·{' '}
                            {detection.location}
                          </span>

                          <small>
                            {detection.date} ·{' '}
                            {detection.time}
                          </small>

                          <small className="notification-confidence">
                            Confidence{' '}
                            {detection.confidence}%
                          </small>

                        </div>

                      </NavLink>
                    ),
                  )}

                  {/* View All */}

                  <NavLink
                    to="/history"
                    className="notification-footer"
                    onClick={() =>
                      setNotificationsOpen(
                        false,
                      )
                    }
                  >

                    View all alerts

                    <ChevronRight size={15} />

                  </NavLink>

                </div>
              )}

            </div>

            {/* ================= PROFILE ================= */}

            <div className="profile">

              <div className="avatar">
                A
              </div>

              <div className="profile-text">

                <b>
                  Admin
                </b>

                <span>
                  Administrator
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <section className="content">

          <Routes>

            {/* Dashboard */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Cameras */}

            <Route
              path="/cameras"
              element={<Cameras />}
            />

            {/* Find Item */}

            <Route
              path="/find"
              element={<FindItem />}
            />

            {/* AI Assistant */}

            <Route
              path="/assistant"
              element={<AIAssistant />}
            />

            {/* Detection History */}

            <Route
              path="/history"
              element={<History />}
            />

            {/* Statistics */}

            <Route
              path="/statistics"
              element={<Statistics />}
            />

            {/* Heatmap */}

            <Route
              path="/heatmap"
              element={<Heatmap />}
            />

            {/* Settings */}

            <Route
              path="/settings"
              element={<SettingsPage />}
            />

          </Routes>

        </section>

      </main>

    </div>
  )
}


/* ================= SETTINGS ================= */

function SettingsPage() {

  return (

    <div className="page">

      <div className="page-heading">

        <div>

          <p className="eyebrow">
            SYSTEM
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Configure FINDCAM system preferences.
          </p>

        </div>

      </div>

      <div className="card settings-card">

        {/* AI Detection */}

        <div className="setting-row">

          <div>

            <b>
              AI Detection
            </b>

            <span>
              Enable object detection service
            </span>

          </div>

          <div className="toggle on">
            <span />
          </div>

        </div>

        {/* Notifications */}

        <div className="setting-row">

          <div>

            <b>
              Notifications
            </b>

            <span>
              Receive new detection alerts
            </span>

          </div>

          <div className="toggle on">
            <span />
          </div>

        </div>

        {/* Confidence */}

        <div className="setting-row">

          <div>

            <b>
              Confidence Threshold
            </b>

            <span>
              Minimum confidence for results
            </span>

          </div>

          <b>
            80%
          </b>

        </div>

      </div>

    </div>

  )
}

export default App