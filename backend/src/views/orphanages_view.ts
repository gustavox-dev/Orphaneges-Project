// V - VIEW => Como as coisas ficam visiveis/disponíveis no nosso front end
import Orphanage from '../models/Orphanage'
import imagesView from './images_view'

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        }
    },
    // Renderizar vários orfanatos
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage)) // Percorre todos os orfanatos e chama o metodo 'render'
    }
}