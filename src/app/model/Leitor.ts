import { Postagem } from "./Postagem";

export class Leitor {
    public id: number;
    public nome: string;
    public email: string;
    public senha: string;
    public foto: string;
    public tipo: string;
    public postagem: Postagem[];
}