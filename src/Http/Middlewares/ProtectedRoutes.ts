import { inject, injectable } from 'inversify';
import CreateBetsAction from '../Actions/Bets/CreateBetsAction';
import GetBetsAction from '../Actions/Bets/GetBetsAction';
import PlaceBetsAction from '../Actions/Bets/PlaceBetsAction';
import ResultBetsAction from '../Actions/Bets/ResultBetsAction';
import UpdateBetsAction from '../Actions/Bets/UpdateBetsAction';
import DepositAction from '../Actions/Transactions/DepositAction';
import GetTransactionsAction from '../Actions/Transactions/GetTransactionsAction';
import WithdrawAction from '../Actions/Transactions/WithdrawAction';
import BanUsersAction from '../Actions/Users/BanUsersAction';
import CreateUsersAction from '../Actions/Users/CreateUsersAction';
import GetUsersAction from '../Actions/Users/GetUsersAction';
import GetUsersBalanceAction from '../Actions/Users/GetUsersBalanceAction';
import UpdateUserAction from '../Actions/Users/UpdateUsersAction';

@injectable()
export default class ProtectedRoutes {

    constructor(
        @inject(CreateUsersAction) private createUserAction: CreateUsersAction,
        @inject(GetUsersAction) private getUsersAction: GetUsersAction,
        @inject(UpdateUserAction) private updateUsersAction: UpdateUserAction,
        @inject(BanUsersAction) private banUsersAction: BanUsersAction,
        @inject(CreateBetsAction) private createBetsAction: CreateBetsAction,
        @inject(PlaceBetsAction) private placeBetsAction: PlaceBetsAction,
        @inject(GetBetsAction) private getBetsAction: GetBetsAction,
        @inject(DepositAction) private depositAction: DepositAction,
        @inject(WithdrawAction) private withdrawAction: WithdrawAction,
        @inject(GetTransactionsAction) private getTransactionsAction: GetTransactionsAction,
        @inject(GetUsersBalanceAction) private getUsersBalanceAction: GetUsersBalanceAction,
        @inject(UpdateBetsAction) private updateBetsAction: UpdateBetsAction,
        @inject(ResultBetsAction) private resultBetsAction: ResultBetsAction
    
    ) {
    }

    public getProtectedRoutes(): string[] {
        return [
            this.createUserAction.ROUTE_PATH,
            this.getUsersAction.ROUTE_PATH,
            this.updateUsersAction.ROUTE_PATH,
            this.banUsersAction.ROUTE_PATH,
            this.createBetsAction.ROUTE_PATH,
            this.placeBetsAction.ROUTE_PATH,
            this.getBetsAction.ROUTE_PATH,
            this.depositAction.ROUTE_PATH,
            this.withdrawAction.ROUTE_PATH,
            this.getTransactionsAction.ROUTE_PATH,
            this.getUsersBalanceAction.ROUTE_PATH,
            this.updateBetsAction.ROUTE_PATH,
            this.resultBetsAction.ROUTE_PATH,
        ];
    }
}
