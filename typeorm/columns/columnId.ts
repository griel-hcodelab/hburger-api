import { TableColumnOptions } from 'typeorm';

export const columnId = {
    name: "id",
    type: "int",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "increment"
} as TableColumnOptions;