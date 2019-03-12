export declare class DragStore {
    static dragStart(scope: any, data: {
        [key: string]: any;
    }, element?: HTMLElement): void;
    static getData(scope: any, field: string): any;
    static dragEnd(): void;
}
