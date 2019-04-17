ALTER TABLE public."user" ADD "isManager" BOOLEAN DEFAULT FALSE;

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "isManager";