const blogRequest = {
  name: {
    notEmpty: true,
    isString: true,
    errorMessage: 'Blog name field cannot be empty',
  },
}

module.exports = blogRequest
