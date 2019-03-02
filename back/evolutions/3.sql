DELETE FROM public.exchange_rate;

ALTER TABLE ONLY public.exchange_rate
    RENAME "due" TO "collectAt";

ALTER TABLE ONLY public.exchange_rate
    ALTER COLUMN  "collectAt" TYPE timestamptz;

ALTER TABLE ONLY public.exchange_rate
    DROP CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89";

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to", "collectAt");

ALTER TABLE ONLY public.income 
    ALTER COLUMN date TYPE timestamptz;

ALTER TABLE ONLY public.outcome
    ALTER COLUMN date TYPE timestamptz;

#DOWN

DELETE FROM public.exchange_rate;

ALTER TABLE ONLY public.exchange_rate
    DROP CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89";

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to");

ALTER TABLE ONLY public.exchange_rate
    RENAME "collectAt" TO "due";

ALTER TABLE ONLY public.exchange_rate
    ALTER COLUMN  "due" TYPE timestamp without time zone;

ALTER TABLE ONLY public.income
    ALTER COLUMN date TYPE timestamp without time zone;

ALTER TABLE ONLY public.outcome
    ALTER COLUMN date TYPE timestamp without time zone;
