import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/react-ts-dynamic-form/",
  plugins: [react()],
})
