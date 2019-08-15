module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-custom-media')({
      importFrom: './src/custom-media.css',
    }),
  ],
};
