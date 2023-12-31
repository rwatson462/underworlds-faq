import {createClient} from "@supabase/supabase-js";
import {env} from "./env.js";

const client = createClient(
    env('SUPABASE_URL'),
    env('SUPABASE_KEY')
)

export function supabaseClient() {
    return client
}
