import * as boolean from "./types/boolean.js";
import * as number from "./types/number.js";
import * as string from "./types/string.js";
import * as list from "./types/list.js";

export default {
    l: {
        description: 'Logging, logging will be disabled if this flag does not exists or set to false, true for enabled',
        type: boolean,
    },
    p: {
        description: 'Network port to listen',
        type: number,
        default: 8080
    },
    d: {
        description: 'Directory to save logs',
        type: string,
        default: '/usr/logs'
    },
    g: {
        description: 'A demo list',
        type: list,
        default: ['hi']
    },
}
