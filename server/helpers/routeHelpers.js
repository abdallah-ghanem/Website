function isActiveRoute(route, currentRoute) {
    return route === currentRoute ? 'active' : '';
}

module.exports = { isActiveRoute };//to call this you should write in app.js