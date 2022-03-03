import { TableColumnOptions } from "typeorm";

export function varchar(name: string = "name", length: string = "255", nullable: boolean = false){

    return {
        name,
        type: "varchar",
        length,
        isNullable: nullable
    } as TableColumnOptions;

} 