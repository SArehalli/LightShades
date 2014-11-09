from flask import Flask
from flask import request
import Haiku
import Shades
import decorator

app = Flask(__name__)

@app.route("/haiku")
def haiku():
    try:
            text_file = request.form['text']
    except:
            text_file = "cask.txt"
    return Haiku.haiku(text_file)

@app.route("/shades", methods=['GET','POST','OPTIONS'])
@decorator.crossdomain(origin='*')
def shades():
    try: 
        username = request.form['username']
        chart = request.form['isChart'] == "True"
    except:
        return "0" 
    return Shades.shades(username, chart)

if __name__ == '__main__':
    app.run(debug=True)
