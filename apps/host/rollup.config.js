import copy from 'rollup-plugin-copy'

export default {
  input: "src/index.js",
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: '../../public/' },
      ]
    })
  ]
}
