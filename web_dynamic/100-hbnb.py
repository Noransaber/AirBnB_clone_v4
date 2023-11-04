#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

# Starts the flask app
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

# Function excutedd when we close the app
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

# Route to connect the functiob with the web
@app.route('/100-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is Working """
    # Having all states from storage
    states = storage.all(State).values()
    # Sorted the states by name
    states = sorted(states, key=lambda k: k.name)
    # Empty list
    st_ct = []

    for state in states:
        # For each state append the state into the empty list after sorting by city name
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    # Having all amenities from the storage
    amenities = storage.all(Amenity).values()
    # Sort the amenities by the name
    amenities = sorted(amenities, key=lambda k: k.name)
    # Having all places
    places = storage.all(Place).values()
    # Sorted all places by name
    places = sorted(places, key=lambda k: k.name)
    # Create the id
    cache_id = uuid.uuid4()

    return render_template('100-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """The Main Function """
    app.run(host='0.0.0.0', port=5000)
