import User from '../../Entities/User';

export default interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  findOneByUsername(name: string): Promise<User>;
  persist(user: User): Promise<number>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<boolean>;
}