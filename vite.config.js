import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'

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
  ]
}
