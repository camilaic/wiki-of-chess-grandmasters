# Front-end project Wiki of Chess Grandmasters

The app creates a Wiki of Chess Grandmasters as defined by Chess.com.

## List the Grandmasters

The `ListOfGrandmasters` component makes an API call to the endpoint: https://api.chess.com/pub/titled/GM, which returns
an array of usernames.
Since the endpoint does not support pagination, client-side pagination was implemented.
All data is fetched at once and stored in the `grandmastersList` variable. The number of pages is calculated based on
the total number of items.
Currently, 50 items are displayed per page.

When the user clicks on the username, they are redirected to the user profile page.

<img src="https://github.com/user-attachments/assets/4a2b8290-a817-499c-ae53-74b72b12b508" alt="Image" width="900" height="650">

## Grandmaster profile page

The `UserProfile` component is responsible for displaying the profile page, which consists of:

- a `Header` component: displays username;
- a `UserDetails` component: displays the user avatar, name (if available), country (if available), joined date, and the
  amount of time since the user was last online ("Last online").
  For this last item, a calculation is performed in the `HoursSinceLastLogin` and `getFormattedHours` functions to
  return the time since the user was active. This time is displayed in the format HH:MM:SS and is updated every second.
- an `Overview` component: displays other miscellaneous information, such as league and player id.

![Image](https://github.com/user-attachments/assets/8f0cf970-afba-4ad5-920e-e8ee34042082)



 
