#!/usr/bin/python
from flup.server.fcgi import WSGIServer
from flask_server import app

if __name__ == '__main__':
    WSGIServer(app).run()