CREATE TABLE public.custom_tip (
    "id"        character varying        NOT NULL,
    "title"     character varying        NOT NULL,
    "text"      character varying        NOT NULL,
    "link"      character varying,
    "expireAt"  timestamp with time zone NOT NULL,
    "important" BOOLEAN                  NOT NULL DEFAULT FALSE
);

ALTER TABLE ONLY public.custom_tip
    ADD CONSTRAINT "PK_custom_tip_id" PRIMARY KEY ("id");

#DOWN

DROP TABLE public.custom_tip;
