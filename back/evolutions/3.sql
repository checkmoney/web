DELETE FROM public.exchange_rate;

ALTER TABLE public.exchange_rate
    RENAME due TO "collectAt";

ALTER TABLE public.exchange_rate
    ALTER COLUMN "collectAt" TYPE timestamp with time zone;

ALTER TABLE public.exchange_rate
    DROP CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89",
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to", "collectAt");

ALTER TABLE public.income 
    ALTER COLUMN date TYPE timestamp with time zone;

ALTER TABLE public.outcome
    ALTER COLUMN date TYPE timestamp with time zone;

#DOWN

DELETE FROM public.exchange_rate;

ALTER TABLE public.exchange_rate
    DROP CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89",
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to");

ALTER TABLE public.exchange_rate
    RENAME "collectAt" TO due;

ALTER TABLE public.exchange_rate
    ALTER COLUMN due TYPE timestamp without time zone;

ALTER TABLE public.income
    ALTER COLUMN date TYPE timestamp without time zone;

ALTER TABLE public.outcome
    ALTER COLUMN date TYPE timestamp without time zone;
