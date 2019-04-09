ALTER TABLE public."user" ADD "profile_defaultcurrency" public.currency DEFAULT 'USD';

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "profile_defaultcurrency";