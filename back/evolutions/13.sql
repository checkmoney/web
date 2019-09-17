ALTER TABLE public."user"
    ALTER COLUMN "password" DROP NOT NULL,
    ALTER COLUMN "password" SET DEFAULT NULL;

#DOWN

ALTER TABLE public."user"
    ALTER COLUMN "password" DROP DEFAULT,
    ALTER COLUMN "password" SET NOT NULL;
