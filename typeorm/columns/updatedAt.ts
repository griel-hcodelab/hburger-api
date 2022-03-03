import { TableColumnOptions } from 'typeorm';

export const updatedAt = {
    name: "updatedAt",
    type: "datetime",
    default: "CURRENT_TIMESTAMP"
} as TableColumnOptions;