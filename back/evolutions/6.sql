ALTER TABLE public."user"
    DROP COLUMN "profile_name";

#DOWN

ALTER TABLE public."user" ADD "profile_name" character varying;
