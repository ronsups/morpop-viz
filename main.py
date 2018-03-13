from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/webapp'
db = SQLAlchemy(app)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/scenario', methods=['GET', 'POST'])
def show_or_add_scenario():

    if request.method == 'POST':
        new_scenario = json.loads(request.get_data(as_text=True))

        return 'New Scenario: ' + str(new_scenario)

    elif request.method == 'GET':
        return 'List of scenarios'


@app.route('/scenario/<s_id>', methods=['GET', 'PUT', 'DELETE'])
def show_edit_delete_scenario(s_id):

    if request.method == 'PUT':
        edited_scenario = json.loads(request.get_data(as_text=True))

        return 'Edit Scenario: ' + str(s_id) + ' ' + str(edited_scenario)

    elif request.method == 'GET':
        return 'Get Scenario: ' + str(s_id)

    elif request.method == 'DELETE':
        return 'Delete Scenario: ' + str(s_id)


if __name__ == '__main__':
    app.run()
