DROP TABLE public.exchange_rate;

#DOWN

CREATE TABLE public.exchange_rate (
    "from"      character varying           NOT NULL,
    "to"        character varying           NOT NULL,
    "collectAt" timestamp without time zone NOT NULL,
    "rate"      double precision            NOT NULL
);

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to", "collectAt");
