import { Clothes } from "./clothes";
import { Color } from "./color";
import { Size } from "./size";
import { User } from "./user";

export class Cart {
    id : number
    clothes : Clothes
    color : Color
    size : Size
    quantity : number
}
