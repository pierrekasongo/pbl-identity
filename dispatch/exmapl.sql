--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: visite; Type: TABLE; Schema: public; Owner: hapi
--

CREATE TABLE public.visite (
    id integer NOT NULL,
    date_visite date,
    motif text,
    utilisateur integer,
    client integer
);


ALTER TABLE public.visite OWNER TO hapi;

--
-- Name: Visite_id_seq; Type: SEQUENCE; Schema: public; Owner: hapi
--

ALTER TABLE public.visite ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Visite_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: client; Type: TABLE; Schema: public; Owner: hapi
--

CREATE TABLE public.client (
    prenom text,
    nom text,
    postnom text,
    sexe text,
    date_naissance date,
    photo text,
    localisation text,
    num_id text,
    entreprise integer,
    parent integer,
    relation text,
    id integer NOT NULL
);


ALTER TABLE public.client OWNER TO hapi;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: hapi
--

ALTER TABLE public.client ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: entreprise; Type: TABLE; Schema: public; Owner: hapi
--

CREATE TABLE public.entreprise (
    id integer NOT NULL,
    nom text
);


ALTER TABLE public.entreprise OWNER TO hapi;

--
-- Name: entreprise_id_seq; Type: SEQUENCE; Schema: public; Owner: hapi
--

ALTER TABLE public.entreprise ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entreprise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: hapi
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    login text,
    nom text,
    password text,
    role text,
    status text
);


ALTER TABLE public.utilisateur OWNER TO hapi;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: hapi
--

ALTER TABLE public.utilisateur ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: hapi
--

INSERT INTO public.client OVERRIDING SYSTEM VALUE VALUES ('eric', 'kande', 'tshiaba', 'M', '1990-04-12', '', 'Kolwezi', '2000', NULL, 0, 'Agent', 3);
INSERT INTO public.client OVERRIDING SYSTEM VALUE VALUES ('pierre', 'kasongo', 'tshiaba', 'M', '1988-01-13', 'e2273c00243d5dc0ce98.png', 'Lubumbashi', '1010', 2, 0, 'Agent', 1);
INSERT INTO public.client OVERRIDING SYSTEM VALUE VALUES ('daren', 'dipanda', 'kasongo', 'M', '2015-07-02', '', 'Lubumbashi', NULL, NULL, 1, 'Enfant', 4);
INSERT INTO public.client OVERRIDING SYSTEM VALUE VALUES ('laure', 'mundja', 'lupaka', 'F', '1991-07-03', '/path/to/photo', 'Lubumbashi', NULL, NULL, 1, 'Epouse', 2);


--
-- Data for Name: entreprise; Type: TABLE DATA; Schema: public; Owner: hapi
--

INSERT INTO public.entreprise OVERRIDING SYSTEM VALUE VALUES (2, 'KAMOA');
INSERT INTO public.entreprise OVERRIDING SYSTEM VALUE VALUES (1, 'TFM');


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: hapi
--

INSERT INTO public.utilisateur OVERRIDING SYSTEM VALUE VALUES (2, 'laure', 'laure', 'c5a29b41cb1d1242006cd5559bc2cf453d7e5c12533a9bdabe6cb3b77a1c480ee977225145029d8774db38190aa20b8d429106160cd9292e8a65df2f691e67ba', 'Admin', 'Actif');
INSERT INTO public.utilisateur OVERRIDING SYSTEM VALUE VALUES (1, 'pkasongo', 'pierre', 'e04ca6d34d63452a67b1e0f96603481746f5700f62046dbad5298849c3a6ee157b6f9912e50ee6041d371ab8be22770af75075fb7304f95058a9b072ee9d5902', 'Encodeur', 'Actif');


--
-- Data for Name: visite; Type: TABLE DATA; Schema: public; Owner: hapi
--

INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (1, '2021-09-10', 'Consultation générale', 1, 1);
INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (2, '2021-10-01', 'Consultation ophtalmologue', 1, 1);
INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (3, '2021-10-04', 'Consultation générale', 1, 2);
INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (5, '2021-10-17', 'test', 2, 1);
INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (6, '2021-10-17', 'testing', 2, 1);
INSERT INTO public.visite OVERRIDING SYSTEM VALUE VALUES (7, '2021-10-17', 'Encore', 2, 1);


--
-- Name: Visite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hapi
--

SELECT pg_catalog.setval('public."Visite_id_seq"', 8, true);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hapi
--

SELECT pg_catalog.setval('public.client_id_seq', 5, true);


--
-- Name: entreprise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hapi
--

SELECT pg_catalog.setval('public.entreprise_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hapi
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: utilisateur User_pkey; Type: CONSTRAINT; Schema: public; Owner: hapi
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: visite Visite_pkey; Type: CONSTRAINT; Schema: public; Owner: hapi
--

ALTER TABLE ONLY public.visite
    ADD CONSTRAINT "Visite_pkey" PRIMARY KEY (id);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: hapi
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: entreprise entreprise_pkey; Type: CONSTRAINT; Schema: public; Owner: hapi
--

ALTER TABLE ONLY public.entreprise
    ADD CONSTRAINT entreprise_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

