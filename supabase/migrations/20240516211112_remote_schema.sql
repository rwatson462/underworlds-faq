
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."cards" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."cards" OWNER TO "postgres";

COMMENT ON TABLE "public"."cards" IS 'List of cards to link to Questions';

ALTER TABLE "public"."cards" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."compiled_questions" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question" "text" NOT NULL,
    "answer" "text" NOT NULL,
    "source" "text" NOT NULL,
    "cards" "jsonb",
    "tags" "json",
    "entry_type" "text" DEFAULT 'faq'::"text" NOT NULL
);

ALTER TABLE "public"."compiled_questions" OWNER TO "postgres";

COMMENT ON TABLE "public"."compiled_questions" IS 'Denormalised data of questions with answers for display on the website';

COMMENT ON COLUMN "public"."compiled_questions"."entry_type" IS 'For FAQ or Errata entries';

ALTER TABLE "public"."compiled_questions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."compiled_questions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."question_sources" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL
);

ALTER TABLE "public"."question_sources" OWNER TO "postgres";

COMMENT ON TABLE "public"."question_sources" IS 'List of valid Sources for Questions';

ALTER TABLE "public"."question_sources" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."question_sources_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."rules_updates" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "where" "text" NOT NULL,
    "old" "text",
    "new" "text" NOT NULL,
    "source" "text" NOT NULL
);

ALTER TABLE "public"."rules_updates" OWNER TO "postgres";

COMMENT ON TABLE "public"."rules_updates" IS 'Changes and additions to rules';

ALTER TABLE "public"."rules_updates" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."rules_updates_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."tags" OWNER TO "postgres";

COMMENT ON TABLE "public"."tags" IS 'A list of tags to apply to each question';

ALTER TABLE "public"."tags" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tags_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."compiled_questions"
    ADD CONSTRAINT "compiled_questions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."question_sources"
    ADD CONSTRAINT "question_sources_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."rules_updates"
    ADD CONSTRAINT "rules_updates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

CREATE POLICY "Enable read access for all users" ON "public"."cards" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."compiled_questions" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."question_sources" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."rules_updates" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tags" FOR SELECT USING (true);

CREATE POLICY "Only Rob can delete data" ON "public"."cards" FOR DELETE TO "authenticated" USING ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can delete data" ON "public"."compiled_questions" FOR DELETE TO "authenticated" USING ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can delete data" ON "public"."question_sources" FOR DELETE TO "authenticated" USING ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can delete data" ON "public"."tags" FOR DELETE TO "authenticated" USING ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can insert data" ON "public"."cards" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can insert data" ON "public"."compiled_questions" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can insert data" ON "public"."question_sources" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can insert data" ON "public"."rules_updates" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only Rob can insert data" ON "public"."tags" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = 'rob.watson@me.com'::"text"));

CREATE POLICY "Only authenticated users can update data" ON "public"."compiled_questions" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);

ALTER TABLE "public"."cards" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."compiled_questions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."question_sources" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."rules_updates" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."cards" TO "anon";
GRANT ALL ON TABLE "public"."cards" TO "authenticated";
GRANT ALL ON TABLE "public"."cards" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."compiled_questions" TO "anon";
GRANT ALL ON TABLE "public"."compiled_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."compiled_questions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."compiled_questions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."compiled_questions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."compiled_questions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."question_sources" TO "anon";
GRANT ALL ON TABLE "public"."question_sources" TO "authenticated";
GRANT ALL ON TABLE "public"."question_sources" TO "service_role";

GRANT ALL ON SEQUENCE "public"."question_sources_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."question_sources_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."question_sources_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."rules_updates" TO "anon";
GRANT ALL ON TABLE "public"."rules_updates" TO "authenticated";
GRANT ALL ON TABLE "public"."rules_updates" TO "service_role";

GRANT ALL ON SEQUENCE "public"."rules_updates_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rules_updates_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rules_updates_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
