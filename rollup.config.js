import copy from 'rollup-plugin-copy'

export default {
  input: "host/index.js",
  plugins: [
    copy({
      targets: [
        { src: 'host/index.html', dest: 'dist/' },
      ]
    })
  ]
}
