CREATE TYPE public.currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);

CREATE TABLE public.exchange_rate (
    "from" public.currency             NOT NULL,
    "to"   public.currency             NOT NULL,
    due    timestamp without time zone NOT NULL,
    rate   double precision            NOT NULL
);

CREATE TABLE public.income (
    id       character varying           NOT NULL,
    amount   integer                     NOT NULL,
    currency public.currency             NOT NULL,
    date     timestamp without time zone NOT NULL,
    source   character varying           NOT NULL,
    "authorLogin" character varying
);

CREATE TABLE public.outcome (
    id            character varying           NOT NULL,
    amount        integer                     NOT NULL,
    currency      public.currency             NOT NULL,
    date          timestamp without time zone NOT NULL,
    category      character varying           NOT NULL,
    "authorLogin" character varying
);

CREATE TABLE public."user" (
    login        character varying NOT NULL,
    password     character varying NOT NULL,
    profile_name character varying
);

ALTER TABLE ONLY public.income
    ADD CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY (id);

ALTER TABLE ONLY public.outcome
    ADD CONSTRAINT "PK_d721e56b4240f79aaa14cb54775" PRIMARY KEY (id);

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_7d7c724e18481fe9a76491f9c89" PRIMARY KEY ("from", "to");

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_a62473490b3e4578fd683235c5e" PRIMARY KEY (login);

ALTER TABLE ONLY public.outcome
    ADD CONSTRAINT "FK_4cf012ae5b68472a8e140e7f006" FOREIGN KEY ("authorLogin") REFERENCES public."user"(login);

ALTER TABLE ONLY public.income
    ADD CONSTRAINT "FK_d667d2cf94a4e34b89bb5fd2007" FOREIGN KEY ("authorLogin") REFERENCES public."user"(login);

#DOWN

DROP TABLE public.exchange_rate;
DROP TABLE public.income;
DROP TABLE public.outcome;
DROP TABLE public."user";
DROP TYPE public.currency;