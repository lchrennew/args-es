import ArgsSchema from "./args-schema.js";
import * as boolean from './types/boolean.js'
import * as number from './types/number.js'
import * as string from './types/string.js'
import * as list from './types/list.js'

const schemaWithoutDefaults = new ArgsSchema({
    a: { type: boolean },
    b: { type: number },
    c: { type: string },
    d: { type: list },
})

const schemaWithDefaults = new ArgsSchema({
    a: { type: boolean, default: true },
    b: { type: number, default: 10 },
    c: { type: string, default: 'hello' },
    d: { type: list, default: [ 'hi' ] },
})

const schemaWithInvalidFlags = new ArgsSchema({
    a: { type: boolean },
    b1: { type: number },
    '': { type: string },
})

const schemaWithoutFlagTypeDefined = new ArgsSchema({
    a: {},
    b: {},
})

describe('is a flag defined', () => {
    const schema = schemaWithoutDefaults
    test('with defined flag should be true', () => {
        expect(schema.defined('a')).toBe(true)
        expect(schema.defined('b')).toBe(true)
        expect(schema.defined('c')).toBe(true)
        expect(schema.defined('d')).toBe(true)
    })
    test('with undefined flag should be false', () => {
        expect(schema.defined('e')).toBe(false)
    })
    describe('flag name other than one character length will be ignored', () => {
        const schema = schemaWithInvalidFlags
        expect(schema.defined('a')).toBe(true)
        expect(schema.defined('b1')).toBe(false)
        expect(schema.defined('')).toBe(false)
    })
});

describe('get type of a flag', () => {
    const schema = schemaWithoutDefaults
    test('undefined flag should raise an exception tipping the flag', () => {
        expect(() => schema.typeOf('e')).toThrowError(`Undefined flag: "e"`)
    })

    test('defined flag should be the type defined', () => {
        expect(schema.typeOf('a').name).toBe('boolean')
        expect(schema.typeOf('b').name).toBe('number')
        expect(schema.typeOf('c').name).toBe('string')
        expect(schema.typeOf('d').name).toBe('list')
    })

    test('flag without type defined should be typeof string', () => {
        const schema = schemaWithoutFlagTypeDefined
        expect(schema.typeOf('a').name).toBe('string')
        expect(schema.typeOf('b').name).toBe('string')
    })
});

describe('defaults', () => {
    test('without default defined should use globalDefault', () => {
        const defualts = schemaWithoutDefaults.defaults()
        expect(defualts).toEqual({ a: false, b: 0, c: '', d: [] })
    })

    test('with default defined should use defined default value', () => {
        const defualts = schemaWithDefaults.defaults()
        expect(defualts).toEqual({ a: true, b: 10, c: 'hello', d: [ 'hi' ] })
    })

    describe('get default of a flag', () => {

        test('undefined flag should raise an exception tipping the flag', () => {
            expect(() => schemaWithoutDefaults.defaultOf('e')).toThrowError(`Undefined flag: "e"`)
        })

        test('defined flag with defined default should be default defined', () => {
            const schema = schemaWithDefaults

            expect(schema.defaultOf('a')).toBe(true)
            expect(schema.defaultOf('b')).toBe(10)
            expect(schema.defaultOf('c')).toBe('hello')
            expect(schema.defaultOf('d')).toEqual([ 'hi' ])
        })

        test('defined flag without defined default should be global default', () => {
            const schema = schemaWithoutDefaults
            expect(schema.defaultOf('a')).toBe(false)
            expect(schema.defaultOf('b')).toBe(0)
            expect(schema.defaultOf('c')).toBe('')
            expect(schema.defaultOf('d')).toEqual([])
        })
    });
})
