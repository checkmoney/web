ALTER TABLE public."user"
    ADD "googleId" VARCHAR(255) DEFAULT NULL,
    ADD "email" VARCHAR(255) DEFAULT NULL;

UPDATE public."user" SET email=login WHERE email IS NULL;

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "googleId",
    DROP COLUMN "email";
