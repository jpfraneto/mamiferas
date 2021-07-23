import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import ResourcesPage from '../resources/ResourcesPage';
import NewResource from '../resources/NewResource';
import ShowResource from '../resources/ShowResource';
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
import EditArticle from '../articles/EditArticle';
import EditImage from '../images/EditImage';
import PasswordRecovery from '../auth/PasswordRecovery';
import NewPassword from '../auth/NewPassword';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/password-recovery/:token' component={NewPassword} />
        <Route exact path='/password-recovery' component={PasswordRecovery} />
        <Route exact path='/resources' component={Resources} />
        <Route exact path='/resources/resource/:id' component={ShowResource} />
        <Route exact path='/resources/new' component={NewResource} />

        <Route exact path='/resources/embarazo'>
          <ResourcesPage tema={'Embarazo'} />
        </Route>
        <Route exact path='/resources/parto'>
          <ResourcesPage tema={'Parto'} />
        </Route>
        <Route exact path='/resources/puerperio'>
          <ResourcesPage tema={'Puerperio'} />
        </Route>
        <Route exact path='/resources/lactancia'>
          <ResourcesPage tema={'Lactancia'} />
        </Route>
        <Route exact path='/resources/crianza'>
          <ResourcesPage tema={'Crianza'} />
        </Route>
        <Route exact path='/resources/relaciones'>
          <ResourcesPage tema={'Relaciones'} />
        </Route>

        <Route exact path='/birth-stories' component={Images} />
        <Route exact path='/birth-stories/new' component={AddImage} />
        <Route exact path='/birth-stories/:id' component={ImageDisplay} />
        <PrivateRoute
          exact
          path='/birth-stories/:id/edit'
          component={EditImage}
        />
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

        <Route exact path='/articles' component={Articles} />
        <PrivateRoute exact path='/articles/new' component={WriteArticle} />
        <Route exact path='/articles/:id' component={ShowArticle} />
        <PrivateRoute exact path='/articles/:id/edit' component={EditArticle} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
