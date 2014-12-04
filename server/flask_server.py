from flask import Flask
from flask import request
import Haiku
import Shades
import decorator
import MySQLdb

app = Flask(__name__)
classifier = Shades.getClassifier()

#...

@app.route("/shades", methods=['GET','POST','OPTIONS'])
@decorator.crossdomain(origin='*')
def shades():
    try: 
        username = request.form['username']
        chart = request.form['isChart'] == "True"
    except:
        return "0" 
    return Shades.shades(username, classifier, chart)

#...

if __name__ == '__main__':
    app.run(debug=True)
