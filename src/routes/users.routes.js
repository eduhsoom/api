const {Router} = require('express');
const multer = require('multer')
const uploadConfig = require('../configs/upload')


const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController =  require('../controllers/UsersControllers')
const UserAvatarController =  require('../controllers/UserAvatarController')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)




const usersController = new UsersController()

const userAvatarController = new UserAvatarController()


usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)



module.exports = usersRoutes