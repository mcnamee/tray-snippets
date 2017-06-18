const {app, BrowserWindow, ipcMain, Tray} = require('electron')
const path = require('path')

const assetsDirectory = path.join(__dirname, './src')

let tray = undefined
let window = undefined

// Don't show the app in the doc
app.dock.hide()

app.on('ready', () => {
  createTray()
  createWindow()
})

/**
 * Quit the app when the window is closed
 */
app.on('window-all-closed', () => {
  app.quit()
})

/**
 * Create Tray Icon
 */
const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'assets/images/sunTemplate.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })
}

/**
 * Get the Window Position
 */
const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x: x, y: y}
}

/**
 * Create the Window
 */
const createWindow = () => {
  window = new BrowserWindow({
    width: 400,
    height: 500,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })
  // window.loadURL(`file://${path.join(__dirname, './build/index.html')}`)
  const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
  });
  window.loadURL(startUrl)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

/**
 * Toggle the Window on click of tray icon
 */
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

/**
 * Show Window
 */
const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})
