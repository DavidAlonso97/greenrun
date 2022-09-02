import UserBet from '../../Entities/UserBet';

export default interface UserBetRepositoryInterface {
  findAll(): Promise<UserBet[]>;
  findOneById(id: number): Promise<UserBet>;
  persist(userBet: UserBet): Promise<number>;
  delete(userBet: UserBet): Promise<boolean>;
}