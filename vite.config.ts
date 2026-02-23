import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { watch } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    watch:{
      usePolling:true
    }
  }
})
