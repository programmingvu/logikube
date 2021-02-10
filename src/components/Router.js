import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Register from './Register';
import Home from './Home';
import Parts from './Parts';
import Part from './Part';
import UserList from './UserList';
import MyContextProvider from '../contexts/MyContext';

const Router = () => (
    
<MyContextProvider>
    <BrowserRouter>
        <Switch>
            
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/part" render={(props) => <Part {...props}/>} />
            <Route path="/parts" component={Parts} />
            <Route path="/users" component={UserList} />
            {/* <Route path="/store/:storeId" component={App} /> */}
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>
</MyContextProvider>
)

export default Router;