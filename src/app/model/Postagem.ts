import { Leitor } from "./Leitor";
import { Tema } from "./Tema";

export class Postagem {
    public id: number;
    public titulo: string;
    public texto: string;
    public date: Date;
    public leitor: Leitor;
    public tema: Tema;
}