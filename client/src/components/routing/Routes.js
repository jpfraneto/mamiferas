import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import ProfileImages from '../profile/ProfileImages';
import Images from '../images/ImagesDisplay';
import ImageDisplay from '../images/ImageDisplay';
import AddImage from '../images/AddImage';
import NotFound from '../layout/NotFound';
import MyProfile from '../profile/MyProfile';
import ProfileImageUpdate from '../profile-forms/ProfileImageUpdate';
import Articles from '../articles/Articles';
import WriteArticle from '../articles/WriteArticle';
import ShowArticle from '../articles/ShowArticle';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/resources' component={Resources} />
        <Route exact path='/images' component={Images} />
        <PrivateRoute exact path='/images/new' component={AddImage} />
        <Route exact path='/images/:id' component={ImageDisplay} />
        <Route exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:username' component={Profile} />
        <Route exact path='/profile/:id/images' component={ProfileImages} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/me' component={MyProfile} />
        <PrivateRoute
          exact
          path='/profile-image-update'
          component={ProfileImageUpdate}
        />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />

        <PrivateRoute exact path='/articles' component={Articles} />
        <PrivateRoute exact path='/articles/new' component={WriteArticle} />
        <PrivateRoute exact path='/articles/:id' component={ShowArticle} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
