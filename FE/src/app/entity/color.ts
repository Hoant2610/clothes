import { Clothes } from "./clothes"

export class Color {
    id : number
    color : string
    originalPrice : any
    sellingPrice : any
    urlImage : string
    constructor(
        id : number = 0,
        color : string = "",
        originalPrice : number = 0,
        sellingPrice : number = 0,
        urlImage : string = "",
    ){
        this.id = id,
        this.color = color
        this.originalPrice = originalPrice
        this.sellingPrice = sellingPrice
        this.urlImage = urlImage
    }
}

