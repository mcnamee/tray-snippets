# Tray Snippets

A little text Snippets manager, built on ReactJS for:

- The web
- Your desktop menu bar/tray (using [Electron](http://electron.atom.io))

## Install

### Step 1. Setup Firebase

All data is stored and sync'd with [Google's Firebase Platform](https://firebase.google.com/). You can get your own API up and running within minutes:

1. Signup for a [Firebase account](https://firebase.google.com/)
1. Create a new project - eg. "Snppts"
1. Turn on email/password __Authentication__
1. Get the Firebase project's API credentials, copy `/.env.sample` to `/.env` and fill in the respective variables (eg. `APIKEY=d8f72k10s39djk29js`). You can get your projects details from Firebase, by clicking on the cog icon, next to overview > 'Add Firebase to your web app'.
1. Add the following __rules__ to the Database

```json
{
  "rules": {
    ".read": false,
    ".write": false,

    "snippets": {
    	"$uid": {
      	".read": "auth != null && auth.uid == $uid",
      	".write": "auth != null && auth.uid == $uid"
    	}
  	},

    "folders": {
    	"$uid": {
      	".read": "auth != null && auth.uid == $uid",
      	".write": "auth != null && auth.uid == $uid"
    	}
  	}
  }
}
```

```sh
npm i
```


## Running

### In your browser

```sh
npm start
```

### OS Menu bar

```sh
npm run electron-start
```

## Packaging

### In your browser

```sh
npm run build
```

### OS Menu bar

```sh
npm run electron-package
```
