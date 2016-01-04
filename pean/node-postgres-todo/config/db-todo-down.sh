#!/bin/sh

cat << EOF | su - postgres -c psql
-- Drop the database:
DROP DATABASE todo;

-- Drop the database user:
DROP USER todo;

EOF