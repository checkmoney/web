ALTER TABLE public."user"
    ADD "telegramId" VARCHAR(255) DEFAULT NULL;

#DOWN

ALTER TABLE public."user"
    DROP COLUMN "telegramId";