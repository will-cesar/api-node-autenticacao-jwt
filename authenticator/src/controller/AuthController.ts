import { getMongoManager, MongoEntityManager } from "typeorm";
import { User } from "../entity/User";


export class AuthController {

    entityManager: MongoEntityManager;

    constructor() {
        this.entityManager = getMongoManager();
    }

    async registerUser(user: User): Promise<User> {
        delete user._password;

        try {
            const savedUser = await this.entityManager.save(user);
            return savedUser;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}