const express = require('express')
const asyncHandler = require('express-async-handler')
const middlewares = require('../middleware/configurator')
const Helper = require('../util/helpers/helper')
const logger = require('../util/logger/logger')
//validator
const { checkSchema } = require('express-validator')
const validateRules = require('../requests/validateRules')

// routes
const authRoutes = require('./authRoutes')
const blogRoutes = require('./blogRoutes')
const postRoutes = require('./postRoutes')

let routes = () => {
  const ApiRoutes = {
    ...authRoutes,
    ...blogRoutes,
    ...postRoutes,
  }

  return processRoutes(ApiRoutes, [])
}

module.exports = routes

function processRoutes(route, globalMiddlewares = []) {
  const Router = express.Router()

  for (let routeKey in route) {
    let middlewareArr = []
    let routeMiddlewareArr = Helper.uniq(
      route[routeKey]['middlewares'].concat(globalMiddlewares)
    )

    for (let middlewareIndex in routeMiddlewareArr) {
      let middleware = getComputedMiddleware(
        Helper.getObjProp(routeMiddlewareArr, middlewareIndex)
      )

      if (middleware) {
        middlewareArr.push(asyncHandler(middleware))
      }
    }

    let routeValidatorName = route[routeKey]['validator']
    if (!Helper.isEmpty(routeValidatorName)) {
      let routeValidator = getComputedValidator(routeValidatorName)
      if (routeValidator) {
        middlewareArr.push(asyncHandler(routeValidator))
      }
    }

    // For error handling in async operations
    let action = asyncHandler(route[routeKey]['action'])

    let routeKeyArr = routeKey.split(' ')

    switch (routeKeyArr[0]) {
      case 'GET':
        Router.get(`/${routeKeyArr[1]}`, middlewareArr, action)
        break

      case 'POST':
        Router.post(`/${routeKeyArr[1]}`, middlewareArr, action)
        break

      case 'PUT':
        Router.put(`/${routeKeyArr[1]}`, middlewareArr, action)
        break

      case 'PATCH':
        Router.patch(`/${routeKeyArr[1]}`, middlewareArr, action)
        break

      case 'DELETE':
        Router.delete(`/${routeKeyArr[1]}`, middlewareArr, action)
        break
    }
  }
  return Router
}

function getComputedMiddleware(middlewareStr) {
  if (!Helper.isString(middlewareStr)) {
    return null
  }

  let middlewareStrArr = middlewareStr.split(':')
  let middlewareName = middlewareStrArr[0]

  if (middlewareStrArr.length == 2) {
    let middlewareArgs = middlewareStrArr[1]

    // Check if the middlewareArgs is an array encoded as JSON
    let isJsonArray =
      middlewareArgs.startsWith('[') && middlewareArgs.endsWith(']')
    let arrArgs = isJsonArray
      ? JSON.parse(middlewareArgs)
      : middlewareArgs.split('|')

    let middlewareMethod = Helper.getObjProp(middlewares, middlewareName)
    return isJsonArray
      ? middlewareMethod(arrArgs)
      : middlewareMethod(...arrArgs)
  }

  return Helper.getObjProp(middlewares, middlewareStr)
}

function getComputedValidator(validatorRequest) {
  return validateRules(checkSchema(validatorRequest))
}
