/**
 * App styles.
 *
 * @param  {Object} theme
 * @param  {Object} theme.breakpoints
 * @param  {Object} theme.typography
 * @return {Object}
 */
const styles = ({ breakpoints }) => ({
  grid: {
    maxWidth: breakpoints.width('sm'), // 600px
  },
});

export default styles;
