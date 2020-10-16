import multer from 'multer'
import path from 'path'


export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now}-${file.originalname}` // Retorna a representação da data e segundo atual em formato numérico

            cb(null, fileName)
        },
    })
}