// build your server here and require it from index.js
const express = require('express')
const projectRouter = require('./project/router')
const resourcesRouter = require('./resource/router')
const tasksRouter = require('./task/router')
const server = express()

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/resources', resourcesRouter)
server.use('/api/tasks', tasksRouter)


server.use( (err, req, res, next) => {
	res.status(res.err || 500).json({
		customMessage: 'something terrible inside server',
		message: err.message,
		stack: err.stack
	})
})

module.exports = server
