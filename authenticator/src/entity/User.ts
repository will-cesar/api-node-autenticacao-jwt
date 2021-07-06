import { pbkdf2Sync, randomBytes } from "crypto";
import { validate } from "email-validator";
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

export enum STATUS {
    INVALID_EMAIL = 'Invalid e-mail',
    INVALID_NAME = 'Invalid name',
    INVALID_PASSWORD = 'The password must contain at least 8 characters, 1 uppercase character, and 1 digit',
    OK = 'Ok',
    REGISTER_ERROR = 'An error occurred while trying to register the user'
}

@Entity()
export class User {

    // Gera o ID automáticamente dentro do mongoDB
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    salt: string;

    @Column()
    hash: string;

    _password: string;

    constructor(
        email: string,
        name: string,
        password: string
    ) {
        this.email = email;
        this.name = name;
        this._password = password;
        this._generatePassword();
    }

    isValid(): STATUS {
        if (!validate(this.email)) {
            return STATUS.INVALID_EMAIL;
        }

        if (!this.name || this.name.length == 0) {
            return STATUS.INVALID_NAME;
        }

        if (!this._isPasswordValid()) {
            return STATUS.INVALID_PASSWORD;
        }

        return STATUS.OK;
    }

    isPasswordCorrect(password: string): boolean {
        const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        return hash == this.hash;
    }

    private _generatePassword(): void {
        if (this._isPasswordValid()) {
            // 16 ==> quantidade de caracteres randômicos
            // toString('hex') ==> passa o buffer para string em hexadecimal
            const salt = randomBytes(16).toString('hex');

            // this._password ==> a senha sem criptografia
            // salt ==> é o buffer criado de forma randômica
            // 1000 ==> é a quantidade de interações do algoritmo que a função vai utilizar
            // 64 ==> tamanho do buffer
            // sha512 ==> é a função criptográfica que vai ser utilizado para criar o hash
            const hash = pbkdf2Sync(this._password, salt, 1000, 64, 'sha512').toString('hex');

            this.salt = salt;
            this.hash = hash;
        }
    }

    private _isPasswordValid(): boolean {
        return this._password
            && this._password.length >= 8     // verifica se a senha é maior que 8
            && /[A-Z]/g.test(this._password)  // verifica se a senha contém pelo menos um caracter com letra maiúscula
            && /[0-9]/g.test(this._password)  // verifica se a senha contém pelo menos um número
    }
}
