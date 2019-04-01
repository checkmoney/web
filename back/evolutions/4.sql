CREATE TABLE public.disabled_tip (
    "token"     character varying        NOT NULL,
    "expireAt"  timestamp with time zone NOT NULL,
    "userLogin" character varying        NOT NULL
);

ALTER TABLE ONLY public.disabled_tip
    ADD CONSTRAINT "FK_disabled_tip_login" FOREIGN KEY ("userLogin") REFERENCES public."user"(login),
    ADD CONSTRAINT "PK_disabled_tip_token" PRIMARY KEY ("token", "userLogin");

#DOWN

DROP TABLE public.disabled_tip;
