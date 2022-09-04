import User from '../../Entities/User';

export default interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  findOneByIdOrFail(id: number): Promise<User>;
  findOneBy(key: string, value: string | number | null): Promise<User>;
  persist(user: User): Promise<number>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<boolean>;
}
