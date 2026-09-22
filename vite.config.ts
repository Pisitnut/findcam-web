import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

// โปรเจกต์นี้ใช้ React และให้เปิดใช้งาน React plugin นะเพื่อน  รองรับ JSX/TSX React Fast Refresh ทำให้แก้โค้ด React แล้วหน้าเว็บอัปเดตทันทีโดยไม่ต้องโหลดใหม่ทั้งหมด
 
