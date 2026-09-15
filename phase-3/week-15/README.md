# Node Modules & Node Web Server — Practice Exercise Solutions

Everything here has been written to match the practice exercise doc and has been
tested end-to-end (I ran each file and confirmed the output).

## nodeModulesProject/ (Questions 1–4)

```
cd nodeModulesProject
node myFirst.js      # -> "My first module" then 8
node mySecond.js      # -> 12
node myCollector.js   # -> imports both, logs multiplied-by-5 results,
                       #    writes/appends to results.txt
cat results.txt
```

## nodeServerProject/ (Questions 5–9)

```
cd nodeServerProject
node randomNumber.js       # logs one random number, Q5
node myWebServer.js        # HTTP server on http://localhost:1234, Q6-8
node myWebServerExpress.js # Express server on http://localhost:1234, Q9
```

- `myWebServer.js` is written with the evolving stages left in as comments
  (fixed message → random number → single about page → any static file)
  so you can see how the listener function changes at each step. The active
  code is the final stage (Q8e): it serves any file from `static/apple-html-css-replica`.
- `myWebServerExpress.js` re-implements the same three behaviors using Express:
  `/message`, `/random`, and `express.static()` for the whole static folder.
- `npm install` has already been run in `nodeServerProject`, so `express` and
  `node_modules` are ready to go (node_modules isn't included in the zip —
  run `npm install` again after unzipping).

### About the "static" folder

The exercise references a specific "apple html css replica" download that
wasn't included in your uploaded PDFs, so I built a small placeholder
Apple-style site (`index.html`, `about.html`, `css/style.css`) with the exact
required text on the about page: `This is coming from my "about page"`.
Drop your own downloaded replica folder in
`nodeServerProject/static/apple-html-css-replica/` in place of mine if you
have the real one from the course — the server code doesn't need to change,
it just serves whatever is in that folder.
