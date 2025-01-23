module.exports = {
    // ... existing config
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
      },
    },
  };
  