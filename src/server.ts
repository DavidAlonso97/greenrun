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
import ResultBetsAction from './Http/Actions/Bets/ResultBetsAction';
import { AuthMiddlewareInterface } from './Http/Middlewares/AuthMiddlewareInterface';
import { INTERFACES } from './Infrastructure/DI/Interfaces.types';

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
  private resultBetsAction: ResultBetsAction;
  private authMiddleware: AuthMiddlewareInterface;

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
    this.resultBetsAction = DIContainer.get<ResultBetsAction>(ResultBetsAction);
    this.authMiddleware = DIContainer.get<AuthMiddlewareInterface>(INTERFACES.AuthMiddlewareInterface);
    this.init();
  }

  init = async () => {

    const server = Hapi.server({
      port: 3000
    });

    dotenv.config();

    var authMiddleware = this.authMiddleware;
    server.ext('onRequest', async function (request, h) {
      if (request.path !== this.loginUserAction.ROUTE_PATH) {
        request = await authMiddleware.check(request);
      }
      return h.continue;
    });

    server.route([
      {
        method: 'POST',
        path: this.loginUserAction.ROUTE_PATH,
        handler: this.loginUserAction.execute
      },
      {
        method: 'POST',
        path: this.createUserAction.ROUTE_PATH,
        handler: this.createUserAction.execute
      },
      {
        method: 'GET',
        path: this.getUsersAction.ROUTE_PATH,
        handler: this.getUsersAction.execute
      },
      {
        method: 'PUT',
        path: this.updateUsersAction.ROUTE_PATH,
        handler: this.updateUsersAction.execute
      },
      {
        method: 'PUT',
        path: this.banUsersAction.ROUTE_PATH,
        handler: this.banUsersAction.execute
      },
      {
        method: 'POST',
        path: this.createBetsAction.ROUTE_PATH,
        handler: this.createBetsAction.execute
      },
      {
        method: 'PUT',
        path: this.updateBetsAction.ROUTE_PATH,
        handler: this.updateBetsAction.execute
      },
      {
        method: 'PUT',
        path: this.resultBetsAction.ROUTE_PATH,
        handler: this.resultBetsAction.execute
      },
      {
        method: 'GET',
        path: this.getBetsAction.ROUTE_PATH,
        handler: this.getBetsAction.execute
      },
      {
        method: 'POST',
        path: this.placeBetsAction.ROUTE_PATH,
        handler: this.placeBetsAction.execute
      },
      {
        method: 'POST',
        path: this.depositAction.ROUTE_PATH,
        handler: this.depositAction.execute
      },
      {
        method: 'POST',
        path: this.withdrawAction.ROUTE_PATH,
        handler: this.withdrawAction.execute
      },
      {
        method: 'GET',
        path: this.getTransactionsAction.ROUTE_PATH,
        handler: this.getTransactionsAction.execute
      },
      {
        method: 'GET',
        path: this.getUsersBalanceAction.ROUTE_PATH,
        handler: this.getUsersBalanceAction.execute
      },
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
  };

}

export default new Server();
