eventful-proxy
==============


## Create Azure Web Site

1.	Visit github.com and fork the project at https://github.com/tacowan/eventful-proxy 
  *  Create an account on github if you do not already have one.
  *  Navigate to https://github.com/tacowan/eventful-proxy and click the “fork” button.
2.	From within http://manage.windowsazure.com select New -> Compute -> Web Site -> Quick Create.  Henceforth I will refer to the site’s name (the subdomain) as YOURSITENAME.  For example, if your website is foo.azurewebsites.net, then YOURSITENAME = foo.
3.	Navigate to you newly created site in the azure console.  From within the Quick start page select “Set up deployment from source control”.  Choose “github”, allow it to access your github account, and connect it to the eventful-proxy fork created in 1.

##  Customize your new website with your own secret keys
The eventful api proxy needs an evenful.com api key.  It also needs to access an azure storage account where we’ll be caching some fairly static result sets to improve your apps responsiveness.

1.	Visit http://api.eventful.com and create and account and get an api key.
2.	If you don’t have one, create a storage account in azure.  
3.	Navigate to the “CONFIGURE” tab for your new web site (within the azure console).  You’ll create 3 connection strings of type custom.  Connection strings are managed about half way down within the CONFIGURE screen
4.	Create custom connection string called EVENTFUL_KEY.  Set its value to your eventful api key.
5.	Create custom connection string called ACCOUNT_NAME.  Set its value to your storage account name.
6.	Create custom connection string called ACCOUNT_KEY.  Set its value to your storage account secret key


## Verify Things Are Working
You can verify things are working by issuing some api requests.  Anything sent to http://YOURSITENAME.azurewebsites.net/eventful will be proxied to eventful with your key added.  Anything sent to http://YOURSITENAME.azurewebsites.net/cache will be saved as a BLOB in your azure storage account.  The following should return results to your browser:

* http://YOURSITENAME.azurewebsites.net/eventful/rest/events/search?   (returns error from eventful)
* http://YOURSITENAME.azurewebsites.net/eventful/rest/events/search?location=austin  (returns a result set)

Now you can merely use the api.eventful.com documentation to send requests and play with the api.  You might also like to take a look at server.js in the gihub project to see how it’s done and see how you could easily add proxies to other services.  Let’s also verify your storage account settings are correct.  Issue the following request:

* http://YOURSITENAME.azurewebsites.net/cache/rest/events/search?location=austin&sort_order=popularity&page_size=8&blobname=popular 

Now navigate to you azure storage account.  There you will find a new container called “events” and within it a file called “popular”.  If you are not finding a new container or blob you may have a mistake in your ACOUNT_NAME or ACCOUNT_KEY values.

(There is also a video that walks through these steps here http://www.youtube.com/watch?v=iUzN9P1LXiE )
