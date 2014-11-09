from flask import Flask

app = Flask(__name__)

@app.route('/python')
def python_test():
    header = "<head><title>Flask Powered Project</title><link rel='stylesheet' type='text/css' href='../static/index.css'></head>"
    body = ""
    body += "<div id='main'><h1>It Works!</h1></div>"
    return "<html>" + header + body + "</html>"

if __name__ == '__main__':
    app.run()
