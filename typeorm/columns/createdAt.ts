import { TableColumnOptions } from 'typeorm';

export const createdAt = {
    name: "createdAt",
    type: "datetime",
    default: "CURRENT_TIMESTAMP"
} as TableColumnOptions;