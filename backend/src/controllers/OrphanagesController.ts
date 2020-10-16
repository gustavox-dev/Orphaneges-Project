import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {

    // Lista os orfanatos
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] // Nome da entidade da coluna que tem as imagens
        })

        return response.json(orphanageView.renderMany(orphanages)) // Renderiza vários orfanatos e chama o método da array de imagens
    },

    // Consulta de orfanato via ID. Método que mostra um único orfanato
    async show(request: Request, response: Response) {
        const { id } = request.params

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(orphanageView.render(orphanage))
    },

    // Cria os orfanatos
    async create(request: Request, response: Response) {
        
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[] // Instrução para informar para o código que a requisição é uma array de arquivos do multer

        const images = requestImages.map(images => { // Mapeia todas as imagens para obter o 
            return {path: images.filename} // Nome do arquivo que foi salvo no disco
        })
    
        const data = { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({ // Esquema de validação do orfanato 
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false, // Se encontrar um campo que não é válido é retornado todos os erros de campos inválidos 
        })
        
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage)
    
        return response.status(201).json(orphanage)
    }
}