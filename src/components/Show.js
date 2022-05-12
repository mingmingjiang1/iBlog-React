import React from 'react';
import TableShow from './TableShow';
import Search from './Search';

export default function Show() {
    return (
        <div>
            <Search placeholder={"请输入标题搜索"} submitDesc={"搜索"}></Search>
            <TableShow ></TableShow>
        </div>
    )
}