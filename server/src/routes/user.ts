import { Router } from 'express'
import { userController } from '../controller/userController'
const router:Router = Router()
//SIGN-UP
router.post('/signUp', userController.signUp)
//LOGIN
router.post('/login', userController.login )
//LOG OUT
router.put('/logout', userController.logout)

export default router