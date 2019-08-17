ALTER TABLE public."user"
    ADD "googleId" VARCHAR(255) DEFAULT NULL;

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "googleId";
