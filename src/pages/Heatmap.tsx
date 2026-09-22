import { useMemo, useState } from 'react'


import { detections } from '../data/mock'

type Room = {
  id: string
  name: string
  className: string
}

const rooms: Room[] = [
  {
    id: 'Bedroom',
    name: 'Bedroom',
    className: 'bedroom',
  },
  {
    id: 'Living Room',
    name: 'Living Room',
    className: 'living-room',
  },
  {
    id: 'Kitchen',
    name: 'Kitchen',
    className: 'kitchen',
  },
  {
    id: 'Entrance',
    name: 'Entrance',
    className: 'entrance',
  },
]

function Heatmap() {

  const [selectedRoom, setSelectedRoom] =
    useState<string | null>(null)

  /*
   * ==========================================
   * นับจำนวน Detection ตาม Location
   * ==========================================
   */

  const locationCounts = useMemo(() => {

    const counts: Record<string, number> = {}

    detections.forEach((detection) => {

      const location = detection.location

      counts[location] =
        (counts[location] || 0) + 1

    })

    return counts

  }, [])

  /*
   * ==========================================
   * จำนวน Detection ทั้งหมด
   * ==========================================
   */

  const totalDetections =
    detections.length

  /*
   * ==========================================
   * หาพื้นที่ที่พบของมากที่สุด
   * ==========================================
   */

  const mostDetectedLocation =
    useMemo(() => {

      return rooms.reduce(
        (highest, room) => {

          const currentCount =
            locationCounts[room.id] || 0

          const highestCount =
            locationCounts[highest.id] || 0

          return currentCount > highestCount
            ? room
            : highest

        },
        rooms[0],
      )

    }, [locationCounts])

  const mostDetectedCount =
    locationCounts[
      mostDetectedLocation.id
    ] || 0

  /*
   * ==========================================
   * หาค่าสูงสุด
   * ==========================================
   */

  const maxCount = Math.max(
    ...rooms.map(
      (room) =>
        locationCounts[room.id] || 0,
    ),
    1,
  )

  /*
   * ==========================================
   * กำหนดระดับ Heat
   * ==========================================
   */

  const getHeatLevel = (
    count: number,
  ) => {

    if (count === 0) {
      return 'low'
    }

    const percentage =
      count / maxCount

    if (percentage >= 0.7) {
      return 'high'
    }

    if (percentage >= 0.4) {
      return 'medium'
    }

    return 'low'
  }

  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (

    <div className="heatmap-page">

      {/* HEADER */}

      <div className="heatmap-header">

        <div>

          <p className="heatmap-eyebrow">
            ANALYTICS
          </p>

          <h1>
            Heatmap
          </h1>

          <p>
            ตำแหน่งที่พบสิ่งของมากที่สุดภายในบ้าน
          </p>

        </div>

        <div className="heatmap-period">

          <span>
            DATA SOURCE
          </span>

          <strong>
            AI Detection
          </strong>

        </div>

      </div>

      {/* SUMMARY */}

      <div className="heatmap-summary">

        <div className="summary-card">

          <span className="summary-label">
            พื้นที่พบของมากที่สุด
          </span>

          <strong>
            {mostDetectedLocation.name}
          </strong>

          <small>
            พบสิ่งของ {mostDetectedCount} ครั้ง
          </small>

        </div>

        <div className="summary-card">

          <span className="summary-label">
            จำนวนพื้นที่
          </span>

          <strong>
            {rooms.length}
          </strong>

          <small>
            พื้นที่ที่ตรวจสอบ
          </small>

        </div>

        <div className="summary-card">

          <span className="summary-label">
            Detection ทั้งหมด
          </span>

          <strong>
            {totalDetections}
          </strong>

          <small>
            รายการ
          </small>

        </div>

      </div>

      {/* HEATMAP CARD */}

      <div className="heatmap-card">

        <div className="card-header">

          <div>

            <h2>
              Object Detection Heatmap
            </h2>

            <p>
              แสดงความถี่ของตำแหน่งที่ AI ตรวจพบสิ่งของ
            </p>

          </div>

        </div>

        {/* HOUSE MAP */}

        <div className="house-map">

          {rooms.map((room) => {

            const count =
              locationCounts[room.id] || 0

            const heatLevel =
              getHeatLevel(count)

            return (

              <button
                key={room.id}
                className={`room ${room.className} ${heatLevel}`}
                onClick={() =>
                  setSelectedRoom(room.id)
                }
              >

                <div className="room-title">
                  {room.name}
                </div>

                <div className="heat-value">
                  {count}
                </div>

                <span>
                  detections
                </span>

                <div className="heat-dot" />

              </button>

            )

          })}

          {/* DOOR */}

          <div className="door">
            DOOR
          </div>

        </div>

        {/* LEGEND */}

        <div className="heatmap-legend">

          <span>
            ความถี่การพบสิ่งของ
          </span>

          <div className="legend-item">
            <i className="legend-high" />
            สูง
          </div>

          <div className="legend-item">
            <i className="legend-medium" />
            ปานกลาง
          </div>

          <div className="legend-item">
            <i className="legend-low" />
            ต่ำ
          </div>

        </div>

      </div>

      {/* SELECTED ROOM */}

      {selectedRoom && (

        <div className="room-detail">

          <div>

            <span>
              SELECTED AREA
            </span>

            <h3>
              {selectedRoom}
            </h3>

            <p>
              ตรวจพบสิ่งของในพื้นที่นี้{' '}
              {locationCounts[selectedRoom] || 0}{' '}
              ครั้ง
            </p>

          </div>

          <div className="detail-number">

            {locationCounts[selectedRoom] || 0}

            <small>
              {' '}detections
            </small>

          </div>

          <button
            onClick={() =>
              setSelectedRoom(null)
            }
          >
            ปิด
          </button>

        </div>

      )}

    </div>

  )
}

export default Heatmap