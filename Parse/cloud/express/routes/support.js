module.exports.contact = function( req, res ) {
  res.renderT('home/support', {
      template: 'home/support',
    }
  )
}