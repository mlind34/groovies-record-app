import MySQLdb as mariadb
from db_credentials import host, user, passwd, db
import requests
import random


def connect_to_database(host=host, user=user, passwd=passwd, db=db):
    '''
    connects to a database and returns a database objects
    '''
    db_connection = mariadb.connect(host, user, passwd, db)

    return db_connection


def execute_query(db_connection=None, query=None, query_params=()):

    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None

    print("Executing %s with %s" % (query, query_params))
    cursor = db_connection.cursor(mariadb.cursors.DictCursor)

    cursor.execute(query, query_params)

    db_connection.commit()
    return cursor
