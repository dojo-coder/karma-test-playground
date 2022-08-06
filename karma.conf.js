const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const mochaReporter = process.env.REPORTER === 'mocha';
const htmlReporter = process.env.REPORTER === 'html';
const coverage = process.env.COVERAGE === 'true';
// assets
const files = [
  {
    pattern: './src/**/*.vue',
    watched: true
  },
  {
    pattern: './src/**/*.js',
    watched: true
  },
  {
    pattern: './test/**/*.js',
    watched: true
  },
  {
    pattern: './snapshots/**/*.md',
    watched: true
  }
];
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: [ 'mocha', 'snapshot', 'mocha-snapshot', 'chai', 'sinon' ],
    // chai config
    client: { chai: { includeStack: true } },
    // debug and context custom
    customContextFile: './contextRunner.html',
    customDebugFile: './specRunner.html',
    files,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-snapshot',
      'karma-mocha-snapshot',
      'karma-chai',
      'karma-sinon',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-coverage-istanbul-reporter',
      'karma-junit-reporter',
      'karma-html-reporter'
      // 'karma-firefox-launcher'
    ],
    preprocessors: {
      './snapshots/**/*.md': ['snapshot'],
      './test/**/*.js': ['webpack'],
      './src/**/*.vue': ['webpack', 'coverage'],
      './src/**/*.js': ['webpack', 'coverage']
    },
    snapshot: {
      update: !!process.env.UPDATE,
      pathResolver: snapshotsPathResolve
    },
    coverageReporter: {
      dir: './results',
      reporters: [{ type: 'html', subdir: 'coverage_report2' }],
      fixWebpackSourcePaths: true,
    },
    junitReporter: {
      outputDir: './results/junit_report',
      suite: 'Unit Tests Samples'
    },
    htmlReporter: {
      outputDir: 'results',
      reportName: 'html_report',
      urlFriendlyName: true,
      focusOnFailures: true
    },
    webpack: {
      resolve: {
        alias: {
          '~': path.join(__dirname)
        }
      },
      mode: 'development',
      entry: './test/main.spec.js',
      module: {
        rules: [
          {
            test: /\.js$/, 
            exclude: /node_modules/, 
            use: ['babel-loader']
          },
          {
            test: /\.(scss|css)$/,
            use: [
              // Note: Only style-loader works for me !!!
              // 'vue-style-loader',
              'style-loader',
              { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
              {loader: 'postcss-loader', options: {sourceMap: true}},
              {loader: 'sass-loader', options: {sourceMap: true}},
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          // Images: Copy image files to build folder
          {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

          // Fonts and SVGs: Inline files
          {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin()
      ]
    },
    mochaReporter: { showDiff: true },
    reporters: getReporters(),
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: true,
    concurrency: Infinity
  });
};
function getReporters() {
  const reps = [];
  if (mochaReporter)
    reps.push('mocha');
  else
    reps.push('progress');
  if (htmlReporter)
    reps.push('html');
  if (coverage)
    reps.push('coverage');
  reps.push('junit');
  return reps;
}
function snapshotsPathResolve(basePath, suiteName) {
  return path.join(__dirname, 'snapshots', `${suiteName}.md`);
}