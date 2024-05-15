const { getAdmins, postAdmin, deleteAdmin, putAdmin, login } = require("../controllers/admin.controller")
const { getProjects, postProject, deleteProject, getProject, putProject } = require("../controllers/projects.controller")
const auth = require('../middlewares/auth.middleware')
const router = require("express").Router()

// Project router
router.get('/projects', getProjects)
router.get('/project/:id', getProject)
router.post('/project', auth, postProject)
router.delete('/project/:id', auth, deleteProject)
router.put('/projecct/:id', auth, putProject)


// Admin Router
router.get('/admins', auth, getAdmins)
router.post('/admin', auth, postAdmin)
router.delete('/admin', auth, deleteAdmin)
router.put('/admin', auth, putAdmin)
router.post('/login', login)


module.exports = router