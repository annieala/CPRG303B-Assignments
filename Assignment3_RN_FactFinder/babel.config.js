module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // The 'plugins' array is now empty or removed, as NativeWind is no longer used.
    // If you had other plugins, you would keep them here.
    plugins: [],
  };
};