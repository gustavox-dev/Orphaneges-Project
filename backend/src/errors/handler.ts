import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors { 
    [key: string]: string[] // A chave é uma string e o valor da chave também é uma string
 }

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    //retorna os erros para o frontend
    if ( error instanceof ValidationError) {
        let errors: ValidationErrors = {
            
        }

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return response.status(400).json({ message: 'Validation fails', error }) //bad request
    }


    console.error(error)

    return response.status(500).json({ message: 'Internal server error' })
}

export default errorHandler