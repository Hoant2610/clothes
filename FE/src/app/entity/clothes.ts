import { Category } from "./category"
import { Color } from "./color"
import { Size } from "./size"

export class Clothes {
    id : number
    name : string
    description : string
    category : Category
    sizes : Size[]
    colors : Color[]
    sold : number
    minPrice : any 
    maxPrice : any
    isEnable : number
    constructor(id: number, name: string, description: string, category: Category, sizes: Size[], colors: Color[], sold: number, isEnable: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.sizes = sizes;
        this.colors = colors;
        this.sold = sold;
        this.isEnable = isEnable;
    }
}

