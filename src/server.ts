import 'reflect-metadata';
import Hapi from '@hapi/hapi';
import CreateUsersAction from './Http/Actions/Users/CreateUsersAction';
import DIContainer from './Infrastructure/DI/di.config';
import GetUsersAction from './Http/Actions/Users/GetUsersAction';
import UpdateUserAction from './Http/Actions/Users/UpdateUsersAction';
import BanUsersAction from './Http/Actions/Users/BanUsersAction';
import LoginUsersAction from './Http/Actions/Auth/LoginUsersAction';
import dotenv from 'dotenv';
import CreateBetsAction from './Http/Actions/Bets/CreateBetsAction';
import PlaceBetsAction from './Http/Actions/Bets/PlaceBetsAction';
import GetBetsAction from './Http/Actions/Bets/GetBetsAction';
import DepositAction from './Http/Actions/Transactions/DepositAction';
import WithdrawAction from './Http/Actions/Transactions/WithdrawAction';
import GetTransactionsAction from './Http/Actions/Transactions/GetTransactionsAction';
import GetUsersBalanceAction from './Http/Actions/Users/GetUsersBalanceAction';
import UpdateBetsAction from './Http/Actions/Bets/UpdateBetsAction';

class Server {
  private loginUserAction: LoginUsersAction;
  private createUserAction: CreateUsersAction;
  private getUsersAction: GetUsersAction;
  private updateUsersAction: UpdateUserAction;
  private banUsersAction: BanUsersAction;
  private createBetsAction: CreateBetsAction;
  private placeBetsAction: PlaceBetsAction;
  private getBetsAction: GetBetsAction;
  private depositAction: DepositAction;
  private withdrawAction: WithdrawAction;
  private getTransactionsAction: GetTransactionsAction;
  private getUsersBalanceAction: GetUsersBalanceAction;
  private updateBetsAction: UpdateBetsAction;

  constructor(
  ) {
    this.loginUserAction = DIContainer.get<LoginUsersAction>(LoginUsersAction);
    this.createUserAction = DIContainer.get<CreateUsersAction>(CreateUsersAction);
    this.getUsersAction = DIContainer.get<GetUsersAction>(GetUsersAction);
    this.updateUsersAction = DIContainer.get<UpdateUserAction>(UpdateUserAction);
    this.banUsersAction = DIContainer.get<BanUsersAction>(BanUsersAction);
    this.createBetsAction = DIContainer.get<CreateBetsAction>(CreateBetsAction);
    this.placeBetsAction = DIContainer.get<PlaceBetsAction>(PlaceBetsAction);
    this.getBetsAction = DIContainer.get<GetBetsAction>(GetBetsAction);
    this.depositAction = DIContainer.get<DepositAction>(DepositAction);
    this.withdrawAction = DIContainer.get<WithdrawAction>(WithdrawAction);
    this.getTransactionsAction = DIContainer.get<GetTransactionsAction>(GetTransactionsAction);
    this.getUsersBalanceAction = DIContainer.get<GetUsersBalanceAction>(GetUsersBalanceAction);
    this.updateBetsAction = DIContainer.get<UpdateBetsAction>(UpdateBetsAction);
    this.init();
  }

  init = async () => {

    const server = Hapi.server({
      port: 3000
    });

    server.route([
      {
        method: 'POST',
        path: '/login',
        handler: this.loginUserAction.execute
      },
      {
        method: 'POST',
        path: '/users',
        handler: this.createUserAction.execute
      },
      {
        method: 'GET',
        path: '/users',
        handler: this.getUsersAction.execute
      },
      {
        method: 'PUT',
        path: '/users/{id}',
        handler: this.updateUsersAction.execute
      },
      {
        method: 'PUT',
        path: '/users/{id}/ban',
        handler: this.banUsersAction.execute
      },
      {
        method: 'POST',
        path: '/bets',
        handler: this.createBetsAction.execute
      },
      {
        method: 'PUT',
        path: '/bets/{id}',
        handler: this.updateBetsAction.execute
      },
      {
        method: 'GET',
        path: '/bets',
        handler: this.getBetsAction.execute
      },
      {
        method: 'POST',
        path: '/users/bets',
        handler: this.placeBetsAction.execute
      },
      {
        method: 'POST',
        path: '/deposit',
        handler: this.depositAction.execute
      },
      {
        method: 'POST',
        path: '/withdraw',
        handler: this.withdrawAction.execute
      },
      {
        method: 'GET',
        path: '/users/transactions',
        handler: this.getTransactionsAction.execute
      },
      {
        method: 'GET',
        path: '/users/balance',
        handler: this.getUsersBalanceAction.execute
      },
    ]);

    dotenv.config();
    await server.start();
    console.log('Server running on %s', server.info.uri);
  };

}

export default new Server();
