
export function env(variable) {
    if (!variable.startsWith('VITE_')) {
        variable = 'VITE_' + variable
    }

    return import.meta.env[variable]
}
