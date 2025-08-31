import { Injectable } from '@nestjs/common';
import { User } from './user.entity'; // Assuming you have a User entity defined
import { CreateUserDto } from './dto/create-user.dto'; // Assuming you have a DTO for creating users

@Injectable()
export class UsersService {
    private users: User[] = []; // This will act as an in-memory store for users

    create(createUserDto: CreateUserDto): User {
        const user = new User(); // Create a new user instance
        user.id = this.users.length + 1; // Simple ID assignment
        user.username = createUserDto.username;
        user.password = createUserDto.password; // In a real application, hash the password
        this.users.push(user); // Save the user
        return user;
    }

    findAll(): User[] {
        return this.users; // Return all users
    }

    findOne(id: number): User {
        return this.users.find(user => user.id === id); // Find a user by ID
    }

    update(id: number, updateUserDto: CreateUserDto): User {
        const user = this.findOne(id);
        if (user) {
            user.username = updateUserDto.username;
            user.password = updateUserDto.password; // In a real application, hash the password
        }
        return user;
    }
}