/*
TO DO:
Late 10/26 -
Still working on getting the redirect to work properly.  It keeps returning undefined sometimes (1) but not other times (58).

Late 10/25 -
I almost have it.  I am returning results from the database.  Now just need to get the redirect
to work properly.

10/25 -
I refactored the code.  Now the data validation appears to be complete.
Next steps - resolve "/1" etc. urls to pull from database (and throw errors if invalid)



The Node/Express tutorial John Smilga (Coding Addict on YouTube) has been invaluable in figuring out how to do this.
Code changed to reflect working through the course.





09/28 - haven't worked on this in a while.  Will return to learning and refactor project starting next week after vacation.

////////////////////////////////////  Older comments:

Start here - see how to get mongoose to pull in value via variable;  current implementation is not pulling in variable name long_url correctly
(it is showing as undefined which is messing up the Schema).  As far as I can tell, this is related to importing the initial variable name
but not updating it after the app runs (so it needs a new instance).  Some methods solve this with classes or functions - see bookmarks for
possible solutions. (09/07).

    Things that are working:
      1. MongoDB connecting; mongoose correctly searching by ID and also creating
        and saving urls. (08/31)
      2. Added counter in the form of the short_url variable. (08/31)
      3. Retrieving data from post statement (09/02)
      4. Validating URL is a valid url (09/02)
      5. Button working (09/02) - related to post statement

    Things still to do:
      1. If valid, create a new record - export the JSON to the user
      2. If someone puts in the URL correctly it will lookup the short_url and
        then redirect to the original_url



09/02:
    Having problems getting POST to work correctly for API and cors routing.
    Going to try switching implementation to replit to see if that improves
    things. - done and working

08/30:
    1. Get new record to post to MongoDB
        A. - it looks like they are properly connecting to MongoDB - I can see
              the activity on MongoDB and it is correctly doing console.log
        B. Next step is to get a new record to post to MongoDB

  set up variables
  test if URL is a valid url
    1. if not a valid URL - give error message
        otherwise move to next step
        (in here save to MongoDB - and retrieve number saved)
    2. generate JSON response - original URL and short url
    3. when you visit the short URL you get redirected to the original URL

08/27 Update - got mongoose initially installed (maybe) - need to get it to
correctly post and save new URL record below - that will mean it is working

Also - need to test URL when submitted to make sure it is a valid Url
Additionally, once that is done, need to test URL to see if it is already
in the database or not.  If it's in the database go ahead and pull the shortUrl
already generated.  If it's not in the database create a new record

Finally, need to have the /api/shorturl redirect browser to the given location
(assuming we also create a new short url for this as well)

Sources:
1. This is where it talks about catching route problems:
https://stackoverflow.com/questions/44539210/express-js-handle-unmached-routes

2. This is how to do DNS lookup:
https://stackoverflow.com/questions/53697633/nodejs-dns-lookup-is-rejecting-urls-with-http

3. Useful walkthrough of creating a POST CRUD API:
https://rahmanfadhil.com/express-rest-api/

4. Pushing items via Mongoose into MongoDB record:
https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose

5. Pulling in form data to nodejs/mongodb
https://programmingmentor.com/post/save-form-nodejs-mongodb/

*/
