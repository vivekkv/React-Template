import App from '../components/App/index.jsx'
import Login from '../components/Home/Login/index.jsx'
import Register from '../components/Home/Register/index.jsx'
import Home from '../components/Home/index.jsx'
import Map from '../components/Map/index.jsx'
import Auth from '../auth'

export default [{
    'component': App,
    'childRoutes': [{
        'component': Home,
         'childRoutes': [{
             'path': '/',
             'getComponent': (Location, callback) => {
                    if (Auth.isUserAuthenticated()) {
                        callback(null, Map);
                    } else {
                        callback(null, Login);
                    }
                }
         }, {
            "path": "/register",
            'component': Register
        }]
    }]
}]