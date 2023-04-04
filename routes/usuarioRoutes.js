import express from 'express'
import { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword} from '../controller/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin );

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/olvide-password', formularioOlvidePassword)

router.post('/',(req, res)=>{
    res.json({msg:'Información de nosotros'})
})

router.get('/login2',(req,res)=>{
    res.render('auth/login2', {autenticado:false})
})
// Sintaxis más para controler:
// router.route('/')
//     .get(function(req,res){
//         res.json({msg: "HOLA MUNDO EN EXPRESS"})
//     })
//     .post(function(req,res){
//         res.json({msg:'Respuesta de tipo POST'})
//     })

export default router;