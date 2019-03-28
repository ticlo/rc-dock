export declare class DragStore {
    static dragStart(scope: any, data: {
        [key: string]: any;
    }, event: DragEvent, element?: any, dragText?: string): void;
    static getData(scope: any, field: string): any;
    static dragEnd(): void;
}
