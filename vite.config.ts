import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 저장소 이름에 맞게 base 경로 설정
  base: '/jarayo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public',
  define: {
    // 빌드 시 환경 변수 API_KEY를 주입 (GitHub Secrets 등에서 설정 필요)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
