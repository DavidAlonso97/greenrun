export default class UpdateBetsCommand {
    public id: number;
    public status: string;
    public odd: number;
    public result: string;

    public constructor(
        id: number,
        status: string,
        odd: number,
        result: string,
    ) {
        this.id = id;
        this.status = status;
        this.odd = odd;
        this.result = result;
    }

    public getId(): number {
        return this.id;
    }

    public getStatus(): string {
        return this.status;
    }

    public getOdd(): number {
        return this.odd;
    }

    public getResult(): string {
        return this.result;
    }
}
