-- Drop existing entities if they exist
DROP INDEX IF EXISTS chamber_gist;
DROP TABLE IF EXISTS chambers CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Create the chambers table if it doesn't exist
CREATE TABLE IF NOT EXISTS chambers (
    id VARCHAR(10) PRIMARY KEY,
    latitude NUMERIC(9,6) NOT NULL,   
    longitude NUMERIC(9,6) NOT NULL,
    total_capacity INTEGER NOT NULL,
    used_capacity INTEGER NOT NULL,
    geom GEOGRAPHY(Point, 4326) NOT NULL
);

-- Create the customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS customers (
    id bigint GENERATED ALWAYS AS IDENTITY,
    latitude NUMERIC(9,6) NOT NULL,   
    longitude NUMERIC(9,6) NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    geom GEOGRAPHY(Point, 4326) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chamber_id VARCHAR(10) NOT NULL REFERENCES chambers(id),
    usage INTEGER DEFAULT 0
);


-- Create a GIST index on the geom column for spatial queries
CREATE INDEX chambers_gist ON chambers USING GIST (geom);


-- Chamber data
INSERT INTO chambers (id, latitude, longitude, total_capacity, used_capacity, geom)
VALUES
(
    'ASSET-X8734',
    51.52466903333144,
    -0.08320212364196779,
    100,
    70,
    ST_SetSRID(ST_MakePoint(-0.08320212364196779, 51.52466903333144), 4326)
),
(
    'ASSET-Z4784',
    51.523641015718525,
    -0.08601307868957521,
    100,
    10,
    ST_SetSRID(ST_MakePoint(-0.08601307868957521, 51.523641015718525), 4326)
),
(
    'ASSET-N2837',
    51.523434943212514,
    -0.08114755153656007,
    100,
    40,
    ST_SetSRID(ST_MakePoint(-0.08114755153656007, 51.523434943212514), 4326)
),
(
    'ASSET-V9345',
    51.52211691871454,
    -0.0851869583129883,
    100,
    30,
    ST_SetSRID(ST_MakePoint(-0.0851869583129883, 51.52211691871454), 4326)
),
(
    'ASSET-Q9547',
    51.523304662537235,
    -0.08331477642059326,
    100,
    70,
    ST_SetSRID(ST_MakePoint(-0.08331477642059326, 51.523304662537235), 4326)
);


DO $$
DECLARE
    asset_latitude NUMERIC(9,6) := 51.520168;
    asset_longitude NUMERIC(9,6) := -0.081597;
BEGIN

    -- Pump 100 fake chambers around head office
    INSERT INTO chambers (id, latitude, longitude, total_capacity, used_capacity, geom)
    SELECT 
        id,
        latitude,
        longitude,
        total_capacity,
        used_capacity,
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) AS geom
    FROM (
        SELECT
            LEFT('ASSET-' || chr(trunc(random() * 26)::int + 65) || chr(trunc(random() * 26)::int + 65) || '' || trunc(random() * 10000), 10) AS id,
            asset_latitude + (random() * 0.1 * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)) AS latitude,
            asset_longitude + (random() * 0.1 * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)) AS longitude,
            FLOOR(random() * 12) * 10 AS total_capacity,
            FLOOR(random() * 8) * 10 AS used_capacity
        FROM generate_series(1, 100) 
    ) AS subquery;

    -- Pump 20 fake chambers around my house (one can dream 🥹 )
    INSERT INTO chambers (id, latitude, longitude, total_capacity, used_capacity, geom)
    SELECT 
        id,
        latitude,
        longitude,
        total_capacity,
        used_capacity,
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) AS geom
    FROM (
        SELECT
            LEFT('ASSET-' || chr(trunc(random() * 26)::int + 65) || chr(trunc(random() * 26)::int + 65) || '' || trunc(random() * 10000), 10) AS id,
            asset_latitude + (random() * 0.1 * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)) AS latitude,
            asset_longitude + (random() * 0.1 * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)) AS longitude,
            FLOOR(random() * 12) * 10 AS total_capacity,
            FLOOR(random() * 8) * 10 AS used_capacity
        FROM generate_series(1, 20) 
    ) AS subquery;

    -- Pump 10 fake chambers around far out, yolo 🤘
    INSERT INTO chambers (id, latitude, longitude, total_capacity, used_capacity, geom)
    SELECT 
        id,
        latitude,
        longitude,
        total_capacity,
        used_capacity,
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) AS geom
    FROM (
        SELECT
            LEFT('ASSET-' || chr(trunc(random() * 26)::int + 65) || chr(trunc(random() * 26)::int + 65) || '' || trunc(random() * 10000), 10) AS id,
            asset_latitude + (random() * 5)  * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)AS latitude,
            asset_longitude + (random() * 5)  * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END)AS longitude,
            FLOOR(random() * 12) * 10 AS total_capacity,
            FLOOR(random() * 8) * 10 AS used_capacity
        FROM generate_series(1, 10) 
    ) AS subquery;

END $$;