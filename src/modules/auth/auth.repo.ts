import sequelize from '../../config/sequelize';
import { User } from '../../interfaces/user.interfaces';
import { QueryTypes } from 'sequelize';

class AuthRepo {
    static async findUserByEmail(email: string): Promise<User | null> {
        const result = await sequelize.query(
            'EXEC GetUserByEmail :email',
            {
                replacements: { email },
                type: QueryTypes.SELECT,
            }
        );
        return (result && result.length > 0) ? result[0] as User : null;
    }

    static async createUser(userData: User): Promise<User> {
        await sequelize.query(
            'EXEC CreateUser :email, :password, :salt',
            {
                replacements: {
                    email: userData.email,
                    password: userData.password,
                    salt: userData.salt,
                },
                type: QueryTypes.INSERT,
            }
        );
        // Fetch and return the created user
        const createdUser = await AuthRepo.findUserByEmail(userData.email);
        if (!createdUser) {
            throw new Error('User creation failed');
        }
        return createdUser;
    }
}

export default AuthRepo;
