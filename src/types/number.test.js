import { parse } from "./number.js";

describe('parse number', () => {
    describe('without defaultValue', () => {
        test('undefined should be 0', () => {
            expect(parse()).toBe(0)
        })

        test('empty string should be 0', () => {
            expect(parse('')).toBe(0)
        })

        test('valid number string should be the corresponding number', () => {
            expect(parse('1')).toBe(1)
            expect(parse('-1')).toBe(-1)
        })

        test('invalid number string should raise an exception tipping the value', () => {
            expect(() => parse('x')).toThrowError('Invalid number value: "x"')
        })
    })

    describe('with defaultValue', () => {
        test('undefined should be defaultValue', () => {
            expect(parse(undefined, 10)).toBe(10)
        })

        test('empty string should be defaultValue', () => {
            expect(parse(undefined, -1)).toBe(-1)
        })

        test('valid number string should be the corresponding number', () => {
            expect(parse('-3', 3)).toBe(-3)
        })

        test('invalid number string should raise an exception tipping the value', () => {
            expect(() => parse('33x', 10)).toThrowError('Invalid number value: "33x"')
        })
    })
})
