import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import { resolve, dirname } from 'path'
import { readdirSync, mkdirSync, renameSync, existsSync, statSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function organizeHtmlFiles() {
  return {
    name: 'organize-html-files',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      if (!existsSync(distDir)) return

      const files = readdirSync(distDir)
      files.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
          const filePath = resolve(distDir, file)
          const stats = statSync(filePath)
          if (stats.isFile()) {
            const name = file.replace('.html', '')
            const targetDir = resolve(distDir, name)
            if (!existsSync(targetDir)) {
              mkdirSync(targetDir, { recursive: true })
            }
            const targetPath = resolve(targetDir, 'index.html')
            renameSync(filePath, targetPath)
          }
        }
      })
    }
  }
}

export default {
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.scss': 'src/styles'
        }
      }
    }),
    pug({ root: './src' }),
    organizeHtmlFiles(),
  ]
}
