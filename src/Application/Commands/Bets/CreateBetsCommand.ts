export default class CreateBetsCommand {
    public bet_option: string;
    public sport: string;
    public status: string;
    public name: string;
    public event_id: number;
    public odd: number;
    public result: string;

    public constructor(
        bet_option: string,
        sport: string,
        status: string,
        name: string,
        event_id: number,
        odd: number,
        result: string,
    ) {
        this.bet_option = bet_option;
        this.sport = sport;
        this.status = status;
        this.name = name;
        this.event_id = event_id;
        this.odd = odd;
        this.result = result;
    }

    public getBetOption(): string {
        return this.bet_option;
    }

    public getSport(): string {
        return this.sport;
    }

    public getStatus(): string {
        return this.status;
    }

    public getName(): string {
        return this.name;
    }

    public getEventId(): number {
        return this.event_id;
    }

    public getOdd(): number {
        return this.odd;
    }

    public getResult(): string {
        return this.result;
    }
}
