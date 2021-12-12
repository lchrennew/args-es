import ArgsSchema from "./args-schema.js";
import sampleSchemaDefinition from "./sample-schema-definition.js";
import ArgsParser from "./args-parser.js";

const schema = new ArgsSchema(sampleSchemaDefinition)
const defaults = schema.defaults()
const parser = new ArgsParser(schema)

describe('ArgsParser.parse', () => {
    test('empty string should be defaultValues', () => {
        expect(parser.parse('')).toEqual(defaults)
    })

    test('undefined flag should raise exception tipping the flag', () => {
        expect(() => parser.parse("-s")).toThrowError('Invalid flag: -s')
        expect(() => parser.parse("-p 8080 hello")).toThrowError('Invalid flag: hello')
    })

    describe('flag-likes', () => {
        test('defined-flag-like should be flag', () => {
            expect(parser.parse("-d -l")).toMatchObject({ d: '/usr/logs', l: true })
        })

        test('undefined-flag-likes should be value', () => {
            expect(parser.parse("-d -s").d).toBe('-s')
            expect(() => parser.parse("-p -s")).toThrowError('Invalid number value: "-s"')
        })
    })

    describe('boolean value', () => {
        test('boolean flag not exists should be defaultValue', () => {
            expect(parser.parse('').l).toBe(defaults.l)
        })

        test('boolean flag exists without value should be true', () => {
            expect(parser.parse('-l').l).toBe(true)
        })

        test('boolean flag exists with valid value should be the specified value', () => {
            expect(parser.parse('-l True').l).toBe(true)
            expect(parser.parse('-l fAlse').l).toBe(false)
        })

        test('boolean flag exists with invalid value should raise exception tipping the value', () => {
            expect(() => parser.parse('-l True1')).toThrowError('Invalid boolean value: "True1"')
        })

        test('duplicated boolean flag should raise exception tipping the flag', () => {
            expect(() => parser.parse('-l -l')).toThrowError('Duplicated flag: -l')
        })
    })

    describe('number value', () => {
        test('number flag not exists should be defaultValue', () => {
            expect(parser.parse('').p).toBe(8080)
        })

        test('number flag exists without value should be defaultValue', () => {
            expect(parser.parse('-p').p).toBe(8080)
        })

        test('number flag exists with valid value should be the specified value', () => {
            expect(parser.parse('-p 8081').p).toBe(8081)
            expect(parser.parse('-p -1').p).toBe(-1)
        })

        test('number flag exists with invalid value should raise exception tipping the value', () => {
            expect(() => parser.parse('-p 123X')).toThrowError('Invalid number value: "123X"')
        })

        test('duplicated boolean flag should raise exception tipping the flag', () => {
            expect(() => parser.parse('-p -p')).toThrowError('Duplicated flag: -p')
        })
    })

    describe('string value', () => {
        test('string flag exists without value should be the default value', () => {
            expect(parser.parse('-d').d).toBe('/usr/logs')
        })

        test('string flag exists with specified value should be the specified value', () => {
            expect(parser.parse('-d ~/logs').d).toBe('~/logs')
        })

        test('duplicated string flag should raise exception tipping the flag', () => {
            expect(() => parser.parse('-d -d')).toThrowError('Duplicated flag: -d')
        })
    })

    describe('list value', () => {
        test('list flag exists without value should be the default value', () => {
            expect(parser.parse('-g').g).toEqual([ 'hi' ])
        })

        test('list flag exists with specified value should be the specified value', () => {
            expect(parser.parse('-g hello,world').g).toEqual([ 'hello', 'world' ])
        })

        test('duplicated list flag should be combined', () => {
            expect(parser.parse('-g hello,world -g hi,args,world').g).toEqual([ 'hello', 'world', 'hi', 'args', 'world' ])
        })
    })

})
