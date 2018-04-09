import React, { Component } from 'react';
import LocationForm from '../components/pages/locationForm'
import CityList from '../components/pages/cityList'
import About from '../components/pages/about'
import CandidateLogin from '../components/pages/candidateLogin'
import ElectionList from '../components/pages/electionList'
import Election from '../components/pages/election'
import CandidateProfile from '../components/pages/candidateProfile'
import {Route, Link} from 'react-router-dom'
import Grid from './grid'
import { get_elections } from '../shared/usvote_api'

const routes = [
      { path: '/',
        exact: true,
        component: LocationForm
      },
      { path: '/elections/:id',
        component: Grid,
        fetchInitialData: (path = '') => get_elections(
          null, path.split('/').pop(), null, null, null
        )
      }
      /*{ path: '/cities',
        exact: true,
        component: CityList
      },
      { path: '/about',
        exact: true,
        component: About
      },
      { path: '/candidate_login',
        exact: true,
        component: CandidateLogin
      },
      { path: '/city/:cityName',
        //exact: true,
        component: ElectionList
      },
      { path: '/election/:electionName',
        //exact: true,
        component: Election
      },
      { path: '/candidate/:candidateName',
        //exact: true,
        component: CandidateProfile
      }*/
];


export default routes;
