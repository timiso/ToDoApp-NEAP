#!/bin/sh

cat << EOF | su - postgres -c psql
-- Create the database user:
CREATE USER todo WITH PASSWORD 'dbpass';

-- Create the database:
CREATE DATABASE todo WITH OWNER=todo
                                LC_COLLATE='en_US.utf8'
                                LC_CTYPE='en_US.utf8'
                                ENCODING='UTF8'
                                TEMPLATE=template0;


EOF