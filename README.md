To start the app:
1. Install yarn on your dev environment
2. Build the packages by typing "yarn"
3. Once done type "yarn start"
4. A browser page will be opened at http://localhost:3000/

# EXPLANATION
The app is made of different components contained in the "components" directory. It mainly uses MaterialUI al UI library and particularly the "Tabs", "SwipeableViews" and Table components.

The MapModule component has listeners for the resizing of the leaflet map which state is dynamically changed.

The CropsModule and FieldsModule are pretty similar and show details regarding the data imported from  the "data" directory.

# FUTURE IMPROVEMENTS
Having had more time I would have developed a logic for selecting fields in the map and to then showing data related to that specific field in a pop-up. Also It would have been interesting to double-click in one of the rows of the tables and to have a pop-up of the map centred on that specific field which would have been highlighted with a different colour.
That's something that I would have achieved through a Flex architecture using action-creators, dispatchers, stores and store listeners to open the pop-ups.

# N.B.
I had to use "nextFarm.centre.coordinates.reverse();" to get the right coordinates from the API. There could be a bug in the data provided.
