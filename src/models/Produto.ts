import mongoose, {Schema, Document} from "mongoose"

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
export interface InterfaceProduto extends Document{
    name: string;
    category: string;
    price: number;
    size: string;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS

