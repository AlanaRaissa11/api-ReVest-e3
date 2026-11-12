import mongoose, {Schema, Document, type InferSchemaType} from "mongoose"

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
//export interface InterfaceProduto extends Document{
//     name: string;
//     category: string;
//     price: number;
//     size: string;
    
// }

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const produtosSchema = new Schema (
    {
        name: {type: String, required: true},
        category: {type: String, required: true},
        price: {type: Number, require: true},
        size: {type: Number, required: true},
        stock: {type: Number, required: true},
        description: {type: String, required: true},
},
{versionKey: false}

);

//EXTRAÇÃO AUTOMÁTICA DO TIPO (SUBSTITUIR A CRIAÇÃO MANUAL DA INTERFACE)
export type InterfaceProduto = InferSchemaType<typeof produtosSchema>;

//CRIAÇÃO DO MODEL (MONGOOSE)
const Produto = mongoose.model("Produto", produtosSchema);

//DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Produto;
