const { isEmpty } = require('../../util/helpers/helper')

const postRequest = {
  title: {
    notEmpty: true,
    isString: true,
    errorMessage: 'Post title field cannot be empty',
  },
  description: {
    notEmpty: true,
    isString: true,
    errorMessage: 'Post description field cannot be empty',
  },
  imageUrl: {
    optional: true,
    isURL: true,
    isString: true,
    errorMessage: 'Image Url field should be a valid url',
  },
  facebookEmbedCode: {
    optional: true,
    isString: true,
    errorMessage: 'facebook Embed Code should be a string',
  },
  twitterEmbedCode: {
    optional: true,
    isString: true,
    errorMessage: 'twitter Embed Code should be a string',
  },
  linkUrl: {
    optional: true,
    isURL: true,
    isString: true,
    errorMessage: 'Link Url field should be a valid url',
  },
}

module.exports = postRequest
