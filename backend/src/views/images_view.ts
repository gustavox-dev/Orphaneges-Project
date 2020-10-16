// V - VIEW => Como as coisas ficam visiveis/disponíveis no nosso front end
import Image from '../models/Image'

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost/3333/uploads/${image.path}` // retorna o endereço da imagem
        }
    },
    // Renderizar vários orfanatos
    renderMany(images: Image[]) {
        return images.map(image => this.render(image)) // Percorre todos os orfanatos e chama o metodo 'render'
    }
}