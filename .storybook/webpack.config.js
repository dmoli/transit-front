module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: "raw-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader"
      }
    ]
  }
};
