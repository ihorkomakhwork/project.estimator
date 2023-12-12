export default interface ICRUD<TRecord> {
    db: any;

    get table(): string;

    set connection(db);

    read: (params?: object, fields?: any[]) => Promise<Array<TRecord>>;

    query(sql: string, args?: any[]);

    where(params: object): { where: string; values: any[] };

    readOne(id: number, fields?: any[]): Promise<Array<TRecord>>;

    create(record: TRecord);

    update(record: Partial<TRecord>, id: number): Promise<Array<TRecord>>;

    delete(id: number): Promise<Array<TRecord>>;

    getColumns(): Promise<Array<string>>;

    createAlias(fields: any[]): string;
}
