import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


export const vuetify = createVuetify({
    components,
    directives,
    defaults: {
        VTextField: {
            variant: 'outlined',
        },
        VTextarea: {
            variant: 'outlined',
        },
        VAutocomplete: {
            variant: 'outlined',
        },
    }
})