import { describe, it, expect } from 'vitest'
import {env} from "@/helpers/env";

describe('env helper test', () => {
    it('automatically prefixes env requests with VITE_', () => {
        import.meta.env.VITE_TEST = 'test'

        expect(env('TEST')).toBe('test')
    })

    it('throws an error if the variable does not exist', () => {
        expect(() => env('TEST2')).toThrow('Missing env var [VITE_TEST2]')
    })
})