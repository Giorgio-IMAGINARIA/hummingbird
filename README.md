To start the app:
1. Install yarn on your dev environment
2. Build the packages by typing "yarn"
3. Once done type "yarn start"
4. A browser page will be opened at http://localhost:3000/

# USAGE
1. Go to the Home page
2. Click the "Fields" tab
3. Click on one of the fields to open a dialog
4. Add or delete crops to see the yield changing

# EXPLANATION
The app is made of different components contained in the "components" directory. Some of these components call Action-Creators contained in the "actions" directory. The Action-Creators dispatch actions that are listed by Stores contained in the "stores" directory. The Stores are listened by some components that upon changes update their state. This pattern is called Flux and it's used for the data flow process of the application.

The app uses MaterialUI al UI library and particularly the "Tabs", "SwipeableViews" and Table components.

The MapModule component has listeners for the resizing of the leaflet map by dynamically changing its state.

The CropsModule and FieldsModule and show details regarding the data imported from the API through an Action-Creator and by using the Fetch library.

The FieldsModule has clickable rows, upon clicking one, the related details on the crops currently selected are shown in a dialog. The checkboxes provided allow the user to add or delete crops for the field and to change the overall yield value.

The states of the checkboxes are controlled through the ActionCreatorModifySelectedCrops and the StoreSelectedCrops. All the calculations related to the yield are made in the latter. 

# FUTURE IMPROVEMENTS
Having had more time I would have developed a logic for selecting fields in the map and to then showing data related to that specific field in a pop-up. Also It would have been interesting to double-click in one of the rows of the tables and to have a pop-up of the map centred on that specific field which would have been highlighted with a different colour.
That's something that I would have achieved through a Flex architecture using action-creators, dispatchers, stores and store listeners to open the pop-ups.

# N.B.
I had to use "nextFarm.centre.coordinates.reverse();" to get the right coordinates from the API. There could be a bug in the data provided. ;)
