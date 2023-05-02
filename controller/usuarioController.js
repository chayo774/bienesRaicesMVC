import { check, validationResult } from "express-validator"//Dependences:
import Usuario from "../models/Usuario.js" //JS:

const formularioLogin = (req, res)=>{
    res.render('auth/login', {
        pagina: 'Inicio de Sesion'
    })
}

const formularioRegistro = (req, res)=>{
    res.render('auth/registro',{
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res)=> {
    // Validación del nombre:
    await check('nombre').notEmpty().withMessage('El nombre no puedir ir vacio').run(req)
    //Validación del correo:
    await check('email').isEmail().withMessage('No es un correo valido').run(req)
    //Validación password:
    await check('password').isLength({min:6}).withMessage('Contraseña debe de tener 6 o más caracteres.').run(req)
    //Validación repetir-password:
    await check("repetir_password").equals(req.body.password).withMessage('Las contraseñas no coinciden.').run(req)

    let resultado = validationResult(req)
    // return res.json(resultado.array())
    //Verificar que el resultado este vacio:
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores:resultado.array(),
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email
            }
        })
    }//min 2:35

    //Alternativa p/ req.body.email - Extrayendo datos utilizando destructiring:
    const {nombre, email, password}=req.body
    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where:{email}})
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina:'Crear cuenta',
            errores: [{msg:'El usuario ya esta registrado'}],
            usuario:{
                nombre: req.body.nombre,
                email:req.body.email
            }
        })
    }

    // console.log(existeUsuario)

    // return;
    //Las siguiente dos lineas crean un report json en el navegador.pero si no se utilizan la pagina se pega y no se crea el usuario.
    // const usuario = await Usuario.create(req.body)
    // res.json(usuario) ***(No se requiere por el momento.)
    
    //Almacenando un usuario en la base:
    await Usuario.create({
        nombre, email, password, token: 123
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina:'Cuenta creada correctamente',
        mensaje:'Hemos enviado un email de confirmación, presiona en el enlace'
    })
}


const formularioOlvidePassword = (req, res)=>{
    res.render('auth/olvide-password',{
    pagina: 'Recupera tu accesso a Bienes Raices'
    })
}
export{
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}
//google expert:
// https://youtu.be/ebcgYqVueZg
//about middleware:
//https://expressjs.com/en/guide/using-middleware.html
//About req.body.nombre según chatGPT:
//En Express.js, req.body es una propiedad de la solicitud (request) que contiene los datos enviados en el cuerpo de la solicitud HTTP. Esta propiedad es útil cuando se trabaja con formularios HTML o con datos en formato JSON, ya que permite acceder a los datos enviados por el cliente en el cuerpo de la solicitud.

// En una función de Express.js, el uso de req.body permite acceder a los datos enviados por el cliente y procesarlos de acuerdo a las necesidades de la aplicación. Por ejemplo, si se está construyendo una aplicación de registro de usuarios, la función que maneja la solicitud de registro podría acceder a los datos de req.body para extraer el nombre de usuario, la dirección de correo electrónico y la contraseña, y luego utilizar esos datos para crear un nuevo registro de usuario en la base de datos.

// Es importante tener en cuenta que para poder utilizar req.body, es necesario utilizar un middleware de análisis de cuerpo (body-parser) que convierta los datos enviados en el cuerpo de la solicitud a un formato que pueda ser procesado por la aplicación. Por ejemplo, si los datos se envían en formato JSON, el middleware de análisis de cuerpo convierte los datos a un objeto JavaScript que se puede utilizar en la función de Express.js.