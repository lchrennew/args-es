import { appendTo } from "./unique.js";

test('duplicated flag should raise exception tipping the arg name', () => {
    const args = { a: 1 }
    expect(() => appendTo(args, { flag: 'a', value: 2 })).toThrowError(`Duplicated flag: -a`)
})

test('unique flag should be appended to args', () => {
    const args = { a: 1 }
    appendTo(args, { flag: 'b', value: 1 })
    expect(args).toEqual({ a: 1, b: 1 })
})
