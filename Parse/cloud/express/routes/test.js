module.exports.test = function( req, res ) {
  res.renderT('home/test', {
      template: 'home/test',
    }
  )
}