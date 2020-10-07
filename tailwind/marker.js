const _ = require('lodash');
const flattenColorPalette = require('./utils/flattenColorPalette')

module.exports = function () {
    return function ({
        addUtilities,
        e,
        theme,
    }) {
        const colors = flattenColorPalette(theme('colors'))

        const utilities = _.fromPairs(
            _.map(_.omit(colors, 'default'), (value, modifier) => {
                return [
                    `.${e(`marker-${modifier}`)}`,
                    {
                      margin: "0 -0.2em",
                      padding: "0 0.4em 0.125em",
                      background: value,
                      boxDecorationBreak: "clone",
                    },
                ]
            })
        )

        addUtilities(utilities)
    }
}
