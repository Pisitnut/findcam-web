export type Detection = {
  id: number
  object: string
  icon: string
  camera: string
  location: string
  confidence: number
  time: string
  date: string
  snapshot: string
}

export const detections: Detection[] = [
  { id: 1, object: 'Keys', icon: '🔑', camera: 'Camera 01', location: 'Living Room', confidence: 94, time: '18:42:31', date: 'Today', snapshot: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
  { id: 2, object: 'Phone', icon: '📱', camera: 'Camera 02', location: 'Bedroom', confidence: 91, time: '19:21:04', date: 'Today', snapshot: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80' },
  { id: 3, object: 'Wallet', icon: '👛', camera: 'Camera 01', location: 'Living Room', confidence: 88, time: '20:03:18', date: 'Today', snapshot: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80' },
  { id: 4, object: 'Bag', icon: '🎒', camera: 'Camera 03', location: 'Entrance', confidence: 96, time: '20:28:42', date: 'Today', snapshot: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80' },
  { id: 5, object: 'Keys', icon: '🔑', camera: 'Camera 02', location: 'Bedroom', confidence: 93, time: '21:14:08', date: 'Today', snapshot: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=80' },
]

export const cameras = [
  { id: 1, name: 'Camera 01', location: 'Living Room', status: 'Online', resolution: '1080p', fps: 10 },
  { id: 2, name: 'Camera 02', location: 'Bedroom', status: 'Online', resolution: '1080p', fps: 10 },
  { id: 3, name: 'Camera 03', location: 'Entrance', status: 'Online', resolution: '1080p', fps: 15 },
  { id: 4, name: 'Camera 04', location: 'Kitchen', status: 'Offline', resolution: '720p', fps: 10 },
]