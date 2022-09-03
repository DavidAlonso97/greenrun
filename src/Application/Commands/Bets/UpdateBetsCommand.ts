export default class UpdateBetsCommand {
    public id: number;
    public status: string;
    public odd: number;

    public constructor(
        id: number,
        status: string,
        odd: number
    ) {
        this.id = id;
        this.status = status;
        this.odd = odd;
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
}
