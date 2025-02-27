export class FallbackError<T> implements Error {
    public name: string;
    public message: string;
    public stack?: string | undefined;
    public fallbackValue?: T;

    constructor(msg?: string, fallbackValue?: T) {
        this.name = "UnknownError";
        this.message = msg || "Unsupported figma functionality";
        this.fallbackValue = fallbackValue;
    }
}