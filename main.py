from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import json
from app import app
from models import Scenario


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/scenario', methods=['GET', 'POST'])
def show_or_add_scenario():

    if request.method == 'POST':
        new_scenario = json.loads(request.get_data(as_text=True))
        new_scenario_id = Scenario.insert(new_scenario)
        return json.dumps({'id': new_scenario_id}), 201

    elif request.method == 'GET':
        return json.dumps({'scenarios': Scenario.get_all()}), 200


@app.route('/scenario/<s_id>', methods=['GET', 'PUT', 'DELETE'])
def show_edit_delete_scenario(s_id):

    if request.method == 'PUT':
        edited_scenario = json.loads(request.get_data(as_text=True))
        print('### ' + str(edited_scenario))
        edited_scenario_id = Scenario.update(edited_scenario)
        return json.dumps({'id': edited_scenario_id}), 204

    elif request.method == 'GET':
        return json.dumps({'scenario': Scenario.get_one(s_id)}), 200

    elif request.method == 'DELETE':
        deleted_id = Scenario.delete(s_id)
        return json.dumps({'id': deleted_id}), 204


if __name__ == '__main__':
    app.run()
