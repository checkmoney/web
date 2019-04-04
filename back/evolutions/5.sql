ALTER TABLE public."user"
    ADD "profile_currency" VARCHAR(40) DEFAULT NULL;

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "profile_currency";