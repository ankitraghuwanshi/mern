import React from 'react'
import {Tabs} from 'antd'
import { Children } from 'react'
import MovieList from './MovieList'
import TheatersTable from './TheatersTable'


function Admin() {

    const tabItems=[
        {
            key : '1',
            label : 'Movies',
            children: <MovieList/>
        },
        {
            key : '2',
            label : 'Theatres',
            children: <TheatersTable/>
        }
    ]

    return (
        <div>
            <h1>admin page</h1>
            <Tabs items={tabItems}/>
        </div>
    )
}

export default Admin