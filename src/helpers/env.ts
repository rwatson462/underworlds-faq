
export function env(variable: string): string {
    if (!variable.startsWith('VITE_')) {
        variable = 'VITE_' + variable
    }

    const value = import.meta.env[variable]

    if (value === undefined) {
        throw new Error(`Missing env var [${variable}]`)
    }

    return value
}
