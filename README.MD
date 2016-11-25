# Setup instructions

1. Download the application from source
2. Run `npm install` to install all dependencies
3. Run `npm start` to compile and run the application

* `node_modules` are ignored, so need to be installed per environment
* `**/*.js` and `**/*.js.map` files are ignored, so need to be compiled per environment

## Known issues

1. Searching repositories
    When attempting to change the search term, the previous term is still passed through and the result is a concatenation of the two.

    I suspect this issue is to do with the `searchTerms` element. However, unable to figure out why the new 'term' is being prepended with the previous.

2. Viewing issues
    When selecting a particular repository result in order to view it's issues, the repo `full_name` is being passed through but the API call is being called twice: the first time with the correct `full_name` value, and the second with an `undefined` `full_name`. This second call is interrupting the initial API call and therefore failing. When removing the suspected reason for the failure, the API call does not get hit at all.

    There are two methods that call the IssueService:
    - `AppComponent.viewIssues()`, called via a user clicking the "View issues" button from the browser.
    - `IssueComponent.getIssues()`, called by the `IssueComponent.ngOnInit()` method in the `IssueComponent`.

    Removing any combinations of these doesn't seem to solve the issue, or introduces another.
