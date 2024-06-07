module.exports = (cfg) => {
    const dev = cfg.env === 'development'

    return {
        plugins: [
            !dev ? null : require('postcss-sort-media-queries')({}),
            !dev ? null : require('postcss-combine-duplicated-selectors')({}),
            !dev ? null : require('autoprefixer')({}),
            dev
                ? null
                : require('cssnano')({
                      preset: [
                          'default',
                          {
                              colormin: false,
                          },
                      ],
                  }),
        ],
        map: dev ? { inline: false } : false,
        log: dev ? console.log('CSS готов') : console.log('MIN.CSS готов'),
    }
}
