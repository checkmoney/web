ALTER TABLE public."user"
  RENAME COLUMN "profile_defaultcurrency" TO "profileDefaultcurrency";

ALTER TABLE public."user"
  ADD "profileWeekstartsonmonday" BOOLEAN DEFAULT TRUE;

#DOWN

ALTER TABLE public."user"
  RENAME COLUMN "profileDefaultcurrency" TO "profile_defaultcurrency";

ALTER TABLE public."user"
  DROP COLUMN "profileWeekstartsonmonday";
