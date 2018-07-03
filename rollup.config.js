import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-server';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    serve({
      verbose: true,
      port: 8080,
      host: 'localhost',
      contentBase: ''
    }),
    livereload({
      watch: 'build',
      verbose: true,
    }),
    scss({
      output: 'build/bundle.css'
    })
  ]
};