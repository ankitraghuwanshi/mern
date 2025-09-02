import React from 'react'
import {Table} from 'antd'

function MovieList() {
    const movies=[
        {
            key: '1',
            poster: 'Image1',
            name: 'batman1',
            discription: 'batman begins',
            duration: 120,
            genre: 'action',
            language: 'english',
            releaseDate: 'oct 23, 2020'
        },
        {
            key: '2',
            poster: 'Image2',
            name: 'batman2',
            discription: 'batman and joker',
            duration: 130,
            genre: 'drama',
            language: 'hindi',
            releaseDate: 'oct 23, 2021'
        }
    ]
    const tableHeadings=[
        {
            title:"Poster",
            dataIndex:"poster"
        },
        {
            title:"Movie name",
            dataIndex:"name"
        },
        {
            title:"Discription",
            dataIndex:"discription"
        },
        {
            title:"Duration",
            dataIndex:"duration"
        },
        {
            title:"Genre",
            dataIndex:"genre"
        },
        {
            title:"Language",
            dataIndex:"language"
        },
        {
            title:"Release Date",
            dataIndex:"releaseDate"
        }
    ]
    return (
        <div>
            <Table dataSource={movies} columns={tableHeadings} />
        </div>
    )
}

export default MovieList