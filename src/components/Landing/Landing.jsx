import React, { useEffect, useState } from "react";
import classes from "./landing.module.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from "axios";


const Landing = (props) => {
    const [itemName, setItemName] = useState('Item1');
    const [items, setItems] = useState([]);
    const [footerItems, setFooterItems] = useState([])
    const [loading, setLoading] = useState(false);


    const onSearch = () => {
        setLoading(true)
        axios.get(`https://www.flickr.com/services/rest/`, {
            params: {
                method: "flickr.photos.search",
                api_key: "891ca7607497fccc59a9b3daf2d96404",
                tags: itemName,
                format: "json",
                extras: "url_l",
                per_page: 5,
                nojsoncallback: 1
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false)
                    setItems(response.data.photos.photo);
                }
            });
    }

    const onDragEnd = result => {
        const destination = result.destination

        if (destination?.droppableId === 'droppable2') {
            const newItems = [];

            items.forEach(item => {
                if (item.id === result.draggableId) {
                    newItems.push(item)
                }
            })

            setFooterItems([...footerItems, ...newItems])

        }

    }
    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className={classes.box}>
                <div className={classes.insideBox}>
                    <div className={classes.header}>
                        <input onChange={(e) => setItemName(e.target.value)}
                            type="text"
                            className={classes.searchInput} />
                        <button onClick={onSearch}>Search</button>
                    </div>
                    <>
                        <div >

                            {loading ?
                                <div className={classes.loader} />
                                : <Droppable droppableId="droppable1" direction="horizontal">
                                    {provided => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={classes.photos}>
                                            {items.map((item, index) =>

                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {provided => (
                                                        <img ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} src={item.url_l} width="100" alt={item.title} className={classes.images} />
                                                    )}
                                                </Draggable>
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            }

                        </div>
                    </>
                    <div className={classes.baskets}>
                        <div className={classes.basket}>{itemName}</div>
                    </div>
                    <Droppable droppableId="droppable2">
                        {provided => (

                            <div className={classes.footer}  {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <h5>Group pics</h5>
                                <div style={{ display: 'flex' }}>
                                    {footerItems?.map(item => {
                                        return <img src={item.url_l} width="100" alt={item.title} className={classes.images} />
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Landing;